document.addEventListener('DOMContentLoaded', function () {
    let loginbtn = document.querySelector('.login-btn');
    let popup = document.querySelector('.pop-up');
    let nameInput = document.querySelector('.name');
    let formsubmit = document.querySelector('.clkbtn');
    let headerbtn = document.querySelector('.header_btn');
    let closebtn = document.querySelector('.close-btn');
    let password = document.querySelector('.password');
    let product_btn = document.querySelector('.product_btn');
    let productPopup = document.querySelector('.product-pop-up');
    let addProductBtn = document.querySelector('.add-product-btn');
    let closeProductBtn = document.querySelector('.close-product-btn');
    let product_details = document.querySelector('.product_details');
    let tableBody = document.querySelector('.table-list');

    // Function to display products from local storage
    function displayProducts() {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        tableBody.innerHTML = '';

        products.forEach(product => {
            let newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>${product.availability}</td>
                <td>
                    <button class="edit-btn" data-id="${product.id}">Edit</button>
                    <button class="delete-btn" data-id="${product.id}">Delete</button>
                </td>
            `;
            tableBody.appendChild(newRow);
        });

        // Add event listeners to the dynamically created edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(editBtn => {
            editBtn.addEventListener('click', function() {
                let productId = this.getAttribute('data-id');
                // Implement edit functionality
                console.log('Edit product with ID:', productId);
                productPopup.classList.add('show');
                // Populate the form with the existing product data
                let product = products.find(p => p.id === productId);
                if (product) {
                    document.querySelector('.product-id').value = product.id;
                    console.log(product.id);
                    document.querySelector('.product-name').value = product.name;
                    document.querySelector('.product-description').value = product.description;
                    document.querySelector('.product-price').value = product.price;
                    document.querySelector('.product-availability').value = product.availability;
                }
            });
        });

        document.querySelectorAll('.delete-btn').forEach(deleteBtn => {
            deleteBtn.addEventListener('click', function() {
                let productId = this.getAttribute('data-id');
                // Implement delete functionality
                let newProducts = products.filter(product => product.id !== productId);
                localStorage.setItem('products', JSON.stringify(newProducts));
                displayProducts();
            });
        });
    }

    displayProducts();

    loginbtn.addEventListener("click", function(e) {
        e.preventDefault();
        popup.classList.add('show');
    });

    closebtn.addEventListener("click", function() {
        popup.classList.remove('show');
    });

    formsubmit.addEventListener("click", function(e) {
        e.preventDefault();
        let nameinputValue = nameInput.value;
        let passwordInput = password.value; 
        
        if (nameinputValue === "" || passwordInput === "") {
            alert('Please fill in the details');
            return;
        }
        localStorage.setItem('name', nameinputValue);
        localStorage.setItem('password', passwordInput);

        console.log(nameinputValue);
        console.log(passwordInput);
        loginbtn.innerHTML = nameinputValue;
        let existingLogoutBtn = headerbtn.querySelector('.logout-btn');
        if (existingLogoutBtn) {
            existingLogoutBtn.remove();
        }
        let newbtn = document.createElement('button');
        newbtn.classList.add('logout-btn');
        newbtn.innerHTML = "LogOut";
        headerbtn.appendChild(newbtn);
        newbtn.addEventListener("click", function() {
            newbtn.remove();
            loginbtn.innerHTML = "Login Button";
            product_details.style.display = "none";
        });
        popup.classList.remove('show');
        product_details.style.display = "block";
    });
      
    product_btn.addEventListener("click", function(e) {
        e.preventDefault();
        productPopup.classList.add('show');
    });

    closeProductBtn.addEventListener("click", function() {
        productPopup.classList.remove('show');
    });

    addProductBtn.addEventListener("click", function(e) {
        e.preventDefault();

        let productId = document.querySelector('.product-id').value;
        let productName = document.querySelector('.product-name').value;
        let productDescription = document.querySelector('.product-description').value;
        let productPrice = document.querySelector('.product-price').value;
        let productAvailability = document.querySelector('.product-availability').value;
       
        if (productId === "" || productName === "" || productDescription === "" || productPrice === "" || productAvailability === "") {
            alert('Please fill in all the details');
            return;
        }

        // Create a product object
        let product = {
            id: productId,
            name: productName,
            description: productDescription,
            price: productPrice,
            availability: productAvailability
        };

        // Get products from local storage, or initialize an empty array
        let products = JSON.parse(localStorage.getItem('products')) || [];
        
        // Check if the product already exists, if so update it
        let existingProductIndex = products.findIndex(p => p.id === productId);
        if (existingProductIndex !== -1) {
            products[existingProductIndex] = product;
        } else {
            // Add the new product to the array
            products.push(product);
        }
        
        // Save the updated products array to local storage
        localStorage.setItem('products', JSON.stringify(products));

        // Display the updated list of products
        displayProducts();

        // Clear the input fields and close the popup
        document.querySelector('.product-id').value = '';
        document.querySelector('.product-name').value = '';
        document.querySelector('.product-description').value = '';
        document.querySelector('.product-price').value = '';
        document.querySelector('.product-availability').value = '';
        productPopup.classList.remove('show');
    });
});
