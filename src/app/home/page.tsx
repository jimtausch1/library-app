import Carousel from "@/components/home/Carousel";
import ExploreTopBooks from "@/components/home/ExploreTopBooks";
import Heros from "@/components/home/Heros";
import LibraryServices from "@/components/home/LibraryServices";

export default function Home() {
  return (
    <main>
      <ExploreTopBooks></ExploreTopBooks>
      <Carousel></Carousel>
      <Heros></Heros>
      <LibraryServices></LibraryServices>
    </main>
  );
}
