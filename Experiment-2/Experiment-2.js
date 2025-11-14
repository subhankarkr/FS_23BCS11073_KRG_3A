const products=[
    {name:'Laptop',category:'electronics',price:1000},
    {name:'T-Shirt',category:'clothes',price:20},
    {name:'Smartphone',category:'electronics',price:500},
    {name:'Novel Book',category:'books',price:15},
    {name:'Jeans',category:'clothes',price:40},
    {name:'Headphones',category:'electronics',price:80}
];

const productList=document.getElementById('product-list');
const categoryFilter=document.getElementById('category');

function displayProducts(filterCategory){
    productList.innerHTML='';

    const filteredProducts=filterCategory==='all'
        ?products
        :products.filter(p=>p.category===filterCategory);

    filteredProducts.forEach(product=>{
        const productDiv=document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML=`
            <h3>${product.name}</h3>
            <p>Category:${product.category}</p>
            <p>Price:$${product.price}</p>
        `;

        productList.appendChild(productDiv);
    });
}

categoryFilter.addEventListener('change',e=>{
    displayProducts(e.target.value);
});

displayProducts('all');
