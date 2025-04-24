import { searchListener } from './results.js';
import YourListModel from './updatedyourlist.js';

searchListener();

const input = document.getElementById('imageInput');
const preview = document.getElementById('previewImage');

input.addEventListener('change', function () {
    const file = this.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        preview.src = '';
        preview.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get('id');
    const model = new YourListModel();
    const listing = model.getById(listingId);

    if (listing) {
        if (listing.image_url && listing.image_url[0]) {
            preview.src = listing.image_url[0];
            preview.style.display = 'block';
        }
        document.getElementById('Product name').value = listing.title || '';
        document.getElementById('tagsInput').value = listing.tags;
        document.getElementById('price').value = listing.resell_price || '';
        document.getElementById('negotiableCheck').checked = listing.negotiable || false;
        document.getElementById('quantity').value = listing.quantity || 1;
        document.getElementById('descriptionInput').value = listing.description?.[0] || '';
    }

    document.getElementById('add-new-listing').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default submission

        const form = event.target;

        if (form.checkValidity()) {
            // Get form data
            const title = document.getElementById('Product name').value;
            const tags = form.querySelector('input[placeholder="Input tags here..."]').value;
            const price = parseFloat(document.getElementById('price').value);
            const negotiable = document.getElementById('negotiableCheck').checked;
            const quantity = parseInt(form.querySelector('input[type="number"][min="1"]').value);
            const description = form.querySelector('textarea').value;
            const imageSrc = preview.src || "";

            // Create a new item
            const model = new YourListModel();
            const newID = Math.max(...model.getAll().map(item => item.itemID), 0) + 1;

            const newItem = {
                itemID: newID,
                title: title,
                contributor: ["You"], // Could be dynamic
                description: [description || "No description available."],
                rating: 0,
                image_url: [imageSrc],
                resell_price: price,
                seller: "You",
                tags: tags,
                negotiable: negotiable,
                quantity: quantity
            };

            model.addListing(newItem);
            model.remove(parseInt(listingId));
            // All required fields are filled — redirect to market.html        
            window.location.href = 'market.html';
        } else {
            // Show validation error messages
            form.reportValidity();
        }
    });

    document.getElementById('delete-btn').addEventListener('click', function (event) {
        model.remove(parseInt(listingId));
        window.location.href = 'market.html';
    });
});
