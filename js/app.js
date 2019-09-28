// Variables
const courses = document.querySelector('#courses-list'),
    shoppingCartContent = document.querySelector('#cart-content tbody'),
    clearCartBtn = document.querySelector('#clear-cart');



// Listerners

loadEventListeners();

function loadEventListeners() {
    //When a new course is added
    courses.addEventListener('click', buyCourse);

    // When remove the btn is clicked
    shoppingCartContent.addEventListener('click', removeCourse);

    // Clear Cart btn
    clearCartBtn.addEventListener('click', clearCart);

    // Document ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}



// Functions

function buyCourse(e) {
    e.preventDefault();
    // Use delefation to find the course that was added
    if(e.target.classList.contains('add-to-cart')) {
        //read the course values
        const course = e.target.parentElement.parentElement;

        // read the values
        getCourceInfo(course);
    }
}
// Read the html info of the selected course
function getCourceInfo(course){
    // Create an object with Course data
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    
    // Insert into the shopping cart
    addIntoCart(courseInfo);
}

    // Display the selected course into the shopping cart

function addIntoCart(course) {
    // create <tr>
    const row = document.createElement('tr');

    // Build the template
    row.innerHTML = ` 
        <tr>
            <td>
                <img src="${course.image}" width="100px">
            </td>
            <td>"${course.title}"</td>
            <td>"${course.price}"</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;
    // Add into the shopping cart
    shoppingCartContent.appendChild(row);

    // Add the courses into storage
    saveIntoStorage(course);
}

//Add the courses into storage
function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();

    // add the course into array
    courses.push(course);

    // since storage saves only string, we convert json into string
    localStorage.setItem('courses', JSON.stringify(courses));
}

// Get the content from storage
function getCoursesFromStorage() {
    let courses;

    // if smth exists on storage, then we get the value, or create an empty array
    if(localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses') );
    }
    return courses;
}

// remove the course from the dom
function removeCourse(e) {
let course, courseId;

    //remove from the dom
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    console.log(courseId);
    // remove from the local storage
    removeCourseLocalStorage(courseId);
}

// remove from local storage
function removeCourseLocalStorage(id) {
    let coursesLS = getCoursesFromStorage();

    //loop throught the array and find the index to remove
    coursesLS.forEach(function(courseLS, index) {
        if(courseLS.id === id) {
            coursesLS.splice(index, 1);
        }
    });

    // Add the rest of the array
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}

// clear the shopping cart
function clearCart() {
    // shoppingCartContent.innerHTML = '';

    while(shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }

    // Clear form local storage
    clearLocalStorage();
}

//Clears the whole storage
function clearLocalStorage() {
    localStorage.clear();
}

// Loads when doc is ready and print cources into shopping cart
function getFromLocalStorage() {
    let coursesLS = getCoursesFromStorage();

    // Loop throught the courses and print into the cart
    coursesLS.forEach(function(course){
        // create the <tr>
        const row = document.createElement('tr');

        //print the content
        row.innerHTML = ` 
            <tr>
                <td>
                    <img src="${course.image}" width=100>
                </td>
                <td>"${course.title}"</td>
                <td>"${course.price}"</td>
                <td>
                    <a href="#" class="remove" data-id="${course.id}">X</a>
                </td>
            </tr>
        `;
         shoppingCartContent.appendChild(row);
    });
}
