import Autoplayvideo from "@/Components/Common/autoplayvideo";
import Banner from "@/Components/Common/banner";
import FullSizeBanner from "@/Components/Common/fullsizebanner";
import Footer from "@/Components/footer";

function HomePage() {
  return (
    <div>
      <Autoplayvideo />
      <FullSizeBanner />
      <Banner
        title={"Step into summer"}
        path="https://cdn.shopify.com/s/files/1/0746/4386/5884/files/product-2.webp?v=1681807707&width=750"
        description={
          "Now in three versatile sizesExpertly crafted footwear with modern flair"
        }
        buttontext="Shop Now"
      />
      <Footer />
    </div>
  );
}

export default HomePage;
