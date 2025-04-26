// Carousel functionality for each section
function setupCarousel(carouselId, prevBtnId, nextBtnId, places) {
    const carousel = document.getElementById(carouselId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    let currentIndex = 0;

    // Function to render the carousel
    function renderCarousel() {
        const visiblePlaces = [
            places[currentIndex % places.length],
            places[(currentIndex + 1) % places.length]
        ];
        carousel.innerHTML = visiblePlaces.join('');
    }

    // Event listeners for buttons
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 2 + places.length) % places.length; // Move two cards backward
        renderCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 2) % places.length; // Move two cards forward
        renderCarousel();
    });

    // Initial render
    renderCarousel();
}

// Data for each section
const unescoPlaces = [
  `<div class="col-md-5 place-card">
                     <a href="Elloracaves_page.html" target="_blank" style="text-decoration: none; color: inherit;">
                    <img src="https://breathedreamgo.com/wp-content/uploads/2010/03/India-for-Beginners-custom-tours-5.jpg" alt="Ellora Caves">
                    <h3>Ellora Caves</h3>
                    <p>Ellora Caves showcases ancient rock-cut architecture and artistry in Maharashtra, India.</p>
                     </a>
                </div>`,
              `<div class="col-md-5 place-card">
                    <a href="Amber_fort_page.html" target="_blank" style="text-decoration: none; color: inherit;">
                    <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/d3/a8/57/images-30-largejpg.jpg?w=700&h=400&s=1" alt="Amber Fort">
                    <h3>Amber Fort</h3>
                    <p>Discover ancient Rajput glory and Mughal architecture.</p>
                    </a>    
                </div>`,
              `<div class="col-md-5 place-card">
                     <a href="GLCT.html" target="_blank" style="text-decoration: none; color: inherit;">
                    <img src="https://dwq3yv87q1b43.cloudfront.net/public/blogs/fit-in/1200x675/Blog_2021030525a9ca951b504165b5d8ce97bbbe1c8a.png" alt="Great Living Chola Temples">
                    <h3>Great Living Chola Temples</h3>
                    <p>The Great Living Chola Temples stand as timeless marvels of Dravidian architecture and spiritual grandeur.</p>
                     </a>     
                </div>`,
               `<div class="col-md-5 place-card">
                     <a href="EC.html" target="_blank" style="text-decoration: none; color: inherit;">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROxz07bCla7z0IXcB9w63FoTp-sDXNtX36LISIdJlpqk9vBQYsb87beaYs9hjFSjB-3M4&usqp=CAU" alt="Elephanta Caves">
                    <h3>Elephanta Caves</h3>
                    <p>The Elephanta Caves are a UNESCO World Heritage site featuring ancient rock-cut temples dedicated primarily to Lord Shiva.</p>
                     </a>  
                </div>`,
              `<div class="col-md-5 place-card">
                     <a href="CPAP.html" target="_blank" style="text-decoration: none; color: inherit;">
                    <img src="https://www.gujarattourism.com/content/dam/gujrattourism/images/july/Champaner-&-Pavagadh-banner.jpg" alt="Champaner Pavagadh Archaeological Park">
                    <h3>Champaner Pavagadh Archaeological Park</h3>
                    <p>Champaner-Pavagadh is a UNESCO site with ancient forts, temples, and mosques set on a historic hill.</p>
                     </a> 
                </div>`,
                `<div class="col-md-5 place-card">
                     <a href="CCC.html" target="_blank" style="text-decoration: none; color: inherit;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Palace_of_Assembly_Chandigarh_2006.jpg" alt="Chandigarh Capitol Complex">
                    <h3>Chandigarh Capitol Complex</h3>
                    <p>The Chandigarh Capitol Complex is a UNESCO World Heritage site featuring modernist government buildings designed by architect Le Corbusier.</p>
                     </a>     
                </div>`,
];

const ancientPlaces = [
  `<div class="col-md-5 place-card">
                     <a href="KT.html" target="_blank" style="text-decoration: none; color: inherit;">
                    <img src="https://i0.wp.com/indiatravel.com/wp-content/uploads/2022/03/khajuraho-slider-imggg-3.jpg?ssl=1" alt="Khajuraho Temples">
                    <h3>Khajuraho Temples</h3>
                    <p>Famous for their intricate sculptures, located in Madhya Pradesh.</p>
                     </a>
                </div>`,
                `<div class="col-md-5 place-card">
                     <a href="ST.html" target="_blank" style="text-decoration: none; color: inherit;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Konarka_Temple.jpg/1200px-Konarka_Temple.jpg" alt="Sun Temple, Konark">
                    <h3>Sun Temple, Konark</h3>
                    <p>A 13th-century temple shaped like a chariot, known for its stunning architecture.</p>
                     </a>
                </div>`,
                `<div class="col-md-5 place-card">
                     <a href="RV.html" target="_blank" style="text-decoration: none; color: inherit;">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdki0wf7tYcd17KtarOPpE6T8UOLUsC3V-t9LxCys0_FxQqq4PiAo_IdlDRku8LPhAIIg&usqp=CAU" alt="Rani Ki Vav">
                    <h3>Rani ki Vav</h3>
                    <p>Rani ki Vav is an intricately carved stepwell, showcasing the grandeur of ancient Indian architecture and devotion beneath the earth.</p>
                     </a>
                </div>`,
                `<div class="col-md-5 place-card">
                     <a href="NU1.html" target="_blank" style="text-decoration: none; color: inherit;">
                    <img src="https://trekkerpedia.com/wp-content/uploads/Library-and-stupas-of-Nalanda-university.jpg" alt="Nalanda University">
                    <h3>Nalanda University</h3>
                    <p>Nalanda University is an ancient center of learning and a UNESCO site, known for its historic Buddhist monastic and educational complex.</p>
                     </a>
                </div>`,
                `<div class="col-md-5 place-card">
                     <a href="Kb.html" target="_blank" style="text-decoration: none; color: inherit;">
                    <img src="https://www.penn.museum/sites/expedition/files/2022/06/kal17.jpg" alt="Kalibangan">
                    <h3>Kalibangan</h3>
                    <p>Kalibangan is an important Indus Valley Civilization site known for its ancient pre-Harappan and Harappan settlements and unique fire altars.</p>
                     </a>
                </div>`,
                `<div class="col-md-5 place-card">
                     <a href="Jb1.html" target="_blank" style="text-decoration: none; color: inherit;">
                    <img src="https://m.economictimes.com/thumb/msid-99456355,width-1600,height-900,resizemode-4,imgsize-343356/jallianwala-bagh-massacres-104th-anniversary-what-happened-why-should-we-always-remember-this-day.jpg" alt="Jallianwala Bagh">
                    <h3>Jallianwala Bagh</h3>
                    <p>Jallianwala Bagh is a historic memorial site in Amritsar, marking the tragic 1919 massacre of unarmed civilians by British troops.</p>
                     </a>
                </div>`,
];

const museumPlaces = [
    `<div class="col-md-5 place-card">
        <img src="https://rajasthantourdriver.com/wp-content/uploads/2023/12/alberthall.jpg" alt="Albert Hall Museum">
        <h3>Albert Hall Museum</h3>
        <p>Albert Hall Museum is a stunning blend of Indo-Saracenic architecture and rich cultural heritage in the heart of Jaipur.</p>
    </div>`,
    `<div class="col-md-5 place-card">
     <a href="VKM_page.html" target="_blank" style="text-decoration: none; color: inherit;">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg55tM5OMfvaNXOJEG7VdoK-uKCMbFIP0Gq-oxiUvxNarqlCxrUlV4B8FUOAtW6pSYVqc&usqp=CAU" alt="Virasat-e-khalsa Museum">
        <h3>Virasat-e-khalsa Museum</h3>
        <p>Virasat-e-Khalsa is a breathtaking tribute to Sikh history and heritage, blending modern design with spiritual legacy.</p>
        </a>
    </div>`,
    `<div class="col-md-5 place-card">
        <img src="https://www.gokitetours.com/wp-content/uploads/2024/11/Top-10-Things-to-Know-About-Victoria-Memorial-in-Kolkata.webp" alt="Victoria Memorial Museum">
        <h3>Victoria Memorial Museum</h3>
        <p>Victoria Memorial Museum is a symbol of colonial heritage and architectural brilliance in Kolkata.</p>
    </div>`,
    `<div class="col-md-5 place-card">
        <img src="https://cdnbbsr.s3waas.gov.in/s337d097caf1299d9aa79c2c2b843d2d78/uploads/2019/09/2023012053.jpg" alt="Patna Museum">
        <h3>Patna Museum</h3>
        <p>Patna Museum is a historic museum in Bihar showcasing ancient artifacts, sculptures, and regional heritage.</p>
    </div>`,
    `<div class="col-md-5 place-card">
        <img src="https://assets.architecturaldigest.in/photos/63a848708df6b9fdb924d677/master/pass/Untitled%20design%20(5).png" alt="City Palace Museum">
        <h3>City Palace Museum, Udaipur</h3>
        <p>The City Palace Museum in Udaipur, Rajasthan, is a historic museum housed within the 450-year-old City Palace, showcasing the rich heritage of the Mewar dynasty.</p>
    </div>`,
    `<div class="col-md-5 place-card">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvSTdmCwok3TzICgTjn5qqDrZqxZYRomMESg&s" alt="Chhatrapati Shivaji Maharaj Vastu Sangrahalaya">
        <h3>Victoria Memorial Museum</h3>
        <p>The Chhatrapati Shivaji Maharaj Vastu Sangrahalaya in Mumbai is a historic museum showcasing art, archaeology, and natural history.</p>
    </div>`,
];
const monumentsPlaces = [
    `<div class="col-md-5 place-card">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6K5N36h2clz_dBugL37N3qut7H-5wYuU_kg&s" alt="Taj Mahal">
                    <h3>Taj Mahal</h3>
                    <p>A stunning white marble mausoleum symbolizing eternal love.</p>
                </div>`,
                `<div class="col-md-5 place-card">
                <a href="Golden_temple_page.html" target="_blank" style="text-decoration: none; color: inherit;">
                    <img src="https://sacredsites.com/images/asia/india/golden_temple_1200.jpg" alt="Sri Harmandir Sahib">
                    <h3>Sri Harmandir Sahib</h3>
                    <p>A serene spiritual haven in Amritsar, the gleaming heart of Sikhism and a symbol of unity.</p>
                    </a>
                </div>`,
                `<div class="col-md-5 place-card">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Agra_03-201.6_10_Agra_Fort.jpg" alt="Agra Fort">
                    <h3>Agra Fort</h3>
                    <p>Agra Fort is a majestic symbol of Mughal power and elegance, echoing centuries of history within its red sandstone walls.</p>
                </div>`,
               `<div class="col-md-5 place-card">
                    <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/42/73/a4/india-gate.jpg?w=900&h=500&s=1" alt="India Gate">
                    <h3>India Gate</h3>
                    <p>India Gate is a war memorial in New Delhi, honoring soldiers who died during World War I and other conflicts.</p>
                </div>`,
               `<div class="col-md-5 place-card">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq0OSi345JCXIJXMDawei9uX5wpJML4RNyvuJHMNbahE_Y3BWzTROtKLq3YwEfgJXlZqw&usqp=CAU" alt="Gateway of India">
                    <h3>Gateway of India</h3>
                    <p>The Gateway of India is a historic archway in Mumbai, built to commemorate the visit of King George V in 1911.</p>
                </div>`,
                `<div class="col-md-5 place-card">
                    <img src="https://s7ap1.scene7.com/is/image/incredibleindia/jama-masjid-delhi-2-attr-hero?qlt=82&ts=1727352349550" alt="Jama Masjid">
                    <h3>Jama Masjid, Delhi</h3>
                    <p>Jama Masjid is a historic mosque in Delhi, India, known for its grand Mughal architecture and large courtyard.</p>
                </div>`,
];
// Initialize carousels
setupCarousel('carousel-unesco', 'prev-btn-unesco', 'next-btn-unesco', unescoPlaces);
setupCarousel('carousel-ancient', 'prev-btn-ancient', 'next-btn-ancient', ancientPlaces);
setupCarousel('carousel-museums', 'prev-btn-museums', 'next-btn-museums', museumPlaces);
setupCarousel('carousel-moneuments', 'prev-btn-monu', 'next-btn-monu', monumentsPlaces);
// Search button functionality
const searchBar = document.querySelector('.search-bar select');
const searchButton = document.querySelector('.search-bar button');

searchButton.addEventListener('click', () => {
    const selectedSection = searchBar.value;
    const section = document.getElementById(`carousel-${selectedSection}`);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
});
