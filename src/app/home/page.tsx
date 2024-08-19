import BootstrapJS from '@/app/home/BootstrapJS';
import Carousel from '@/app/home/Carousel';
import ExploreTopBooks from '@/app/home/ExploreTopBooks';
import Heros from '@/app/home/Heros';
import LibraryServices from '@/app/home/LibraryServices';

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
