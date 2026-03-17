import Blogs from '../components/Blogs';
import Carousel from '../components/Carousel';
import Navbar from '../components/shared/Navbar';
import { blogs } from '../data/blogs';

export default function Home() {
  return (
    <div>
      <Carousel blogs={blogs} />
      <Blogs />
    </div>
  );
}
