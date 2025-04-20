import React, { useState, useEffect, useRef } from "react";

function App() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const newArrivalsRef = useRef(null);
  const bestSellersRef = useRef(null);
  const collectionsRef = useRef(null);
  const saleRef = useRef(null);
  const accessoriesRef = useRef(null);

  return (
    <div className={`app-container ${activeDropdown ? "blur-background" : ""}`}>
      <Topbar
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
      />
      <div className={`main-content ${activeDropdown ? "blurred" : ""}`}>
        <Name />
        <NavBar
          scrollRefs={{
            newArrivals: newArrivalsRef,
            bestSellers: bestSellersRef,
            sale: saleRef,
            accessories: accessoriesRef,
            collections: collectionsRef,
          }}
        />
        <MainPage title="New Arrivals" ref={newArrivalsRef} id="new-arrivals" />
        <MainPage title="Best Sellers" ref={bestSellersRef} id="best-sellers" />
        <MainPage
          title="Featured Collections"
          ref={collectionsRef}
          id="collections"
        />
        <MainPage title="Sale Items" ref={saleRef} id="sale" />
        <MainPage title="Accessories" ref={accessoriesRef} id="accessories" />
        <Footer />
      </div>
      {activeDropdown && (
        <div className="overlay" onClick={() => setActiveDropdown(null)}></div>
      )}
    </div>
  );
}

function Topbar({ activeDropdown, setActiveDropdown }) {
  const dropdownItems = [
    {
      id: "new-arrivals",
      title: "New Arrivals",
      content: {
        left: {
          heading: "Fresh cuts, Just in",
          description:
            "Explore the latest minimalist styles designed for movement, comfort, and confidence. Every piece is a step forward.",
        },
        middle: ["This Week's Highlights", "Back in Stock", "Limited Editions"],
        right: "Shop the newest arrivals →",
      },
    },
    {
      id: "best-sellers",
      title: "Best Sellers",
      content: {
        left: {
          heading: "Customer Favorites",
          description:
            "Discover our most popular items that have stood the test of time and continue to impress with quality and style.",
        },
        middle: ["Top Rated Items", "Most Reviewed", "Staff Picks"],
        right: "Shop all best sellers →",
      },
    },
    {
      id: "sale",
      title: "Sale",
      content: {
        left: {
          heading: "Limited Time Offers",
          description:
            "Explore our current markdowns and seasonal promotions. Quality pieces at exceptional value.",
        },
        middle: ["End of Season", "Clearance Items", "Bundle Deals"],
        right: "View all sale items →",
      },
    },
    {
      id: "shoes",
      title: "Shoes",
      content: {
        left: {
          heading: "Step into Comfort",
          description:
            "Our footwear collection combines minimalist design with maximum comfort and durability for everyday wear.",
        },
        middle: ["Sneakers", "Boots", "Formal Shoes"],
        right: "Browse all footwear →",
      },
    },
    {
      id: "accessories",
      title: "Accessories",
      content: {
        left: {
          heading: "Complete Your Look",
          description:
            "Elevate any outfit with our carefully curated selection of minimalist accessories and finishing touches.",
        },
        middle: ["Bags", "Jewelry", "Hats & Scarves"],
        right: "Explore all accessories →",
      },
    },
    {
      id: "collections",
      title: "Collections",
      content: {
        left: {
          heading: "Curated Collections",
          description:
            "Discover our themed collections that tell a cohesive story through carefully selected pieces that work together.",
        },
        middle: ["Summer Essentials", "Workwear", "Weekend Casual"],
        right: "View all collections →",
      },
    },
    {
      id: "luxury",
      title: "Luxury",
      content: {
        left: {
          heading: "Premium Selection",
          description:
            "Indulge in our high-end offerings featuring premium materials, exceptional craftsmanship, and timeless design.",
        },
        middle: [
          "Designer Collaborations",
          "Premium Materials",
          "Limited Editions",
        ],
        right: "Explore luxury items →",
      },
    },
    {
      id: "gift-cards",
      title: "Gift Cards",
      content: {
        left: {
          heading: "The Perfect Gift",
          description:
            "Give the gift of choice with our digital and physical gift cards, perfect for any occasion or celebration.",
        },
        middle: ["Digital Cards", "Physical Cards", "Corporate Gifts"],
        right: "Purchase gift cards →",
      },
    },
  ];

  const handleMouseEnter = (id) => {
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <div className="topbar-container">
      <div className="top-bar">
        <div className="logo">👕</div>

        {dropdownItems.map((item) => (
          <h4
            key={item.id}
            className={activeDropdown === item.id ? "active" : ""}
            onMouseEnter={() => handleMouseEnter(item.id)}
          >
            {item.title}
          </h4>
        ))}

        <div className="search-icon">🔍</div>
        <div className="cart-icon">💼</div>
      </div>

      {activeDropdown && (
        <div className="dropdown-container" onMouseLeave={handleMouseLeave}>
          <DropdownPanel
            content={
              dropdownItems.find((item) => item.id === activeDropdown).content
            }
          />
        </div>
      )}
    </div>
  );
}

function DropdownPanel({ content }) {
  return (
    <div className="dropdownpanel">
      <div className="left-panel">
        <h2>{content.left.heading}</h2>
        <h3>{content.left.description}</h3>
      </div>
      <div className="middle-panel">
        {content.middle.map((item, index) => (
          <h2 key={index}>{item}</h2>
        ))}
      </div>
      <div className="right-panel">
        <h2>{content.right}</h2>
      </div>
    </div>
  );
}

function Name() {
  return (
    <div className="name">
      <h1>Shop Something</h1>
    </div>
  );
}

function NavBar({ scrollRefs }) {
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="nav-bar">
      <h4 onClick={() => scrollToSection(scrollRefs.newArrivals)}>
        New Arrivals
      </h4>
      <h4 onClick={() => scrollToSection(scrollRefs.bestSellers)}>
        Best Sellers
      </h4>
      <h4 onClick={() => scrollToSection(scrollRefs.sale)}>Sale</h4>
      <h4 onClick={() => scrollToSection(scrollRefs.accessories)}>
        Accessories
      </h4>
      <h4 onClick={() => scrollToSection(scrollRefs.collections)}>
        Collections
      </h4>
    </div>
  );
}

const MainPage = React.forwardRef(({ title, id }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentDivRef = useRef(null);

  const products = {
    "New Arrivals": [
      {
        title: "Suits",
        price: "$129.99",
        imageUrl: "suits-removebg-preview.png",
      },
      {
        title: "Jackets",
        price: "$99.99",
        imageUrl: "jackets1-removebg-preview.png",
      },
      {
        title: "Shirts",
        price: "$49.99",
        imageUrl: "shirts-removebg-preview.png",
      },
      {
        title: "Pants",
        price: "$69.99",
        imageUrl: "pants-removebg-preview.png",
      },
      {
        title: "T-Shirts",
        price: "$29.99",
        imageUrl: "T-shirts-removebg-preview (1).png",
      },
      {
        title: "Sweaters",
        price: "$79.99",
        imageUrl: "Sweaters-removebg-preview.png",
      },
    ],
    "Best Sellers": [
      {
        title: "Classic Tee",
        price: "$34.99",
        imageUrl: "ClassicTee-removebg-preview.png",
      },
      {
        title: "Denim Jeans",
        price: "$89.99",
        imageUrl: "Denim_Jeans-removebg-preview.png",
      },
      {
        title: "Bomber Jacket",
        price: "$119.99",
        imageUrl: "BoomberJacket-removebg-preview.png",
      },
      {
        title: "Oxford Shirt",
        price: "$59.99",
        imageUrl: "Oxford_Shirt-removebg-preview.png",
      },
      {
        title: "Chino Pants",
        price: "$69.99",
        imageUrl: "Chino_Pants-removebg-preview.png",
      },
      {
        title: "Polo Shirt",
        price: "$44.99",
        imageUrl: "PoloShirt-removebg-preview.png",
      },
    ],
    "Featured Collections": [
      {
        title: "Summer Line",
        price: "$79.99",
        imageUrl: "Summer_Line-removebg-preview.png",
      },
      {
        title: "Workwear",
        price: "$149.99",
        imageUrl: "Workwear-removebg-preview.png",
      },
      {
        title: "Essentials",
        price: "$89.99",
        imageUrl: "Essentials-removebg-preview.png",
      },
      {
        title: "Minimal Set",
        price: "$199.99",
        imageUrl: "Minimal_Set-removebg-preview.png",
      },
      {
        title: "Weekend Casual",
        price: "$129.99",
        imageUrl: "Weekend_Casual-removebg-preview.png",
      },
      {
        title: "Urban Collection",
        price: "$159.99",
        imageUrl: "Urban_Collection-removebg-preview.png",
      },
    ],
    "Sale Items": [
      {
        title: "Linen Shirt",
        price: "$39.99",
        imageUrl: "linen_shirt-removebg-preview.png",
      },
      {
        title: "Wool Coat",
        price: "$149.99",
        imageUrl: "wooooo-removebg-preview.png",
      },
      {
        title: "Slim Jeans",
        price: "$59.99",
        imageUrl: "slim_jeans-removebg-preview.png",
      },
      {
        title: "Dress Pants",
        price: "$69.99",
        imageUrl: "DRESSPANTS-removebg-preview.png",
      },
      {
        title: "Casual Shirt",
        price: "$44.99",
        imageUrl: "caual_shirt-removebg-preview.png",
      },
      {
        title: "Knit Sweater",
        price: "$59.99",
        imageUrl: "knit_sweater-removebg-preview.png",
      },
    ],
    Accessories: [
      {
        title: "Leather Belt",
        price: "$49.99",
        imageUrl: "Leather_Belt-removebg-preview.png",
      },
      {
        title: "Watch",
        price: "$129.99",
        imageUrl: "images__1_-removebg-preview.png",
      },
      {
        title: "Sunglasses",
        price: "$79.99",
        imageUrl: "SunGlassesssss-removebg-preview.png",
      },
      {
        title: "Wallet",
        price: "$59.99",
        imageUrl: "wallet-removebg-preview.png",
      },
      {
        title: "Backpack",
        price: "$89.99",
        imageUrl: "backpack-removebg-preview.png",
      },
      {
        title: "Hat",
        price: "$29.99",
        imageUrl: "hat-removebg-preview.png",
      },
    ],
  };

  const sectionProducts = products[title] || products["New Arrivals"];

  const visibleItems = 4;

  const prevItem = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0 ? 0 : prevIndex - 1;
    });
  };

  const nextItem = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === sectionProducts.length - visibleItems
        ? prevIndex
        : prevIndex + 1;
    });
  };

  useEffect(() => {
    if (contentDivRef.current) {
      const slideDistance = currentIndex * 320;
      contentDivRef.current.style.transform = `translateX(-${slideDistance}px)`;
    }
  }, [currentIndex]);

  return (
    <div className="content-container" ref={ref} id={id}>
      <h2>{title}</h2>
      <div className="carousel-container">
        <button
          className="carousel-arrow prev"
          onClick={prevItem}
          disabled={currentIndex === 0}
          aria-label="Previous item"
        >
          &#10094;
        </button>

        <div className="carousel-wrapper">
          <div className="content-div" ref={contentDivRef}>
            {sectionProducts.map((product, index) => (
              <Content
                key={`${title}-${index}`}
                title={product.title}
                price={product.price}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        </div>

        <button
          className="carousel-arrow next"
          onClick={nextItem}
          disabled={currentIndex === sectionProducts.length - visibleItems}
          aria-label="Next item"
        >
          &#10095;
        </button>
      </div>

      <div className="carousel-dots">
        {Array.from({ length: sectionProducts.length - visibleItems + 1 }).map(
          (_, index) => (
            <span
              key={index}
              className={`dot ${currentIndex === index ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          )
        )}
      </div>
    </div>
  );
});

function Content({ title, price, imageUrl }) {
  // Add imageUrl to props
  return (
    <div className="content-square">
      <h2 className="text">{title}</h2>
      <img
        src={imageUrl} // <-- Use the imageUrl prop here
        alt={`${title} product`}
        className="img"
      />
      <div className="buy">
        <h4 className="text">{price}</h4>
        <h3>Shop</h3>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Customer Support</h3>
          <ul>
            <li>
              <h4>Help Center</h4>
            </li>
            <li>
              <h4>Track Your Order</h4>
            </li>
            <li>
              <h4>Returns & Exchanges</h4>
            </li>
            <li>
              <h4>Shipping Info</h4>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li>
              <h4>About Us</h4>
            </li>
            <li>
              <h4>Careers</h4>
            </li>
            <li>
              <h4>Press</h4>
            </li>
            <li>
              <h4>Blog</h4>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li>
              <h4>Privacy Policy</h4>
            </li>
            <li>
              <h4>Terms & Conditions</h4>
            </li>
            <li>
              <h4>Accessibility</h4>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Connect</h3>
          <p>Email: support@minimalwear.com</p>
          <p>Phone: +1 (800) 123-4567</p>
          <div className="social-icons">
            <span>FB</span>
            <span>IG</span>
            <span>TW</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} MinimalWear. All rights reserved.
      </div>
    </footer>
  );
}

export default App;
