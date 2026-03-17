import Card from '../components/Card';
import Carousel from '../components/Carousel';
import Navbar from '../components/shared/Navbar';
import { blogs } from '../data/blogs';

export default function Home() {
  return (
    <div>
      <Carousel blogs={blogs} />
      <Card />
    </div>
  );
}
