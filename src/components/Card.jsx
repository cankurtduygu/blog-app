import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../features/authSlice';
import { toast } from 'react-toastify';

export default function Card() {
 const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const handleClick = () => {
    if (!user) {
      toast.info("Please log in or register to continue.");
      navigate("/sign-in");
      return;
    }

    navigate("/blogs/1");
  };
  return (
    <div className="card lg:card-side bg-base-100 shadow-sm">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
          alt="Album"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">New album is released!</h2>
        <p>Click the button to listen on Spotiwhy app.</p>
        <div className="card-actions justify-end">
          <button 
            className="btn btn-primary"
            onClick={handleClick}
            >Show More</button>
        </div>
      </div>
    </div>
  );
}
