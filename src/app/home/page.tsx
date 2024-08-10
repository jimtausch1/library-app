import Carousel from "@/components/home/Carousel";
import ExploreTopBooks from "@/components/home/ExploreTopBooks";
import Heros from "@/components/home/Heros";
import LibraryServices from "@/components/home/LibraryServices";
import BootstrapJS from "@/components/utils/BootstrapJS";

export default function Home() {
  return (
    <main>
      <ExploreTopBooks></ExploreTopBooks>
      <Carousel></Carousel>
      <Heros></Heros>
      <LibraryServices></LibraryServices>
      <BootstrapJS></BootstrapJS>
    </main>
  );
}
