import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Home({ items }) {
  const nav = useNavigate();
  function handleClick() {
    nav("/additem");
  }

  function handleDelete(id){
    console.log(id)
    fetch(`http://localhost:3000/api/items/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        window.location.reload(); 
      } else {
        throw new Error('Something went wrong');
      }
    })
    .catch(error => console.log(error));
  }
  return (
    <div className="bg-gray-100 h-screen">
      <div className=" inline-flex justify-end w-full pt-4 pr-10">
        <button
          onClick={handleClick}
          className="ml-3 rounded-md bg-gradient-to-r from-teal-500 to-cyan-500 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add New Item
        </button>
      </div>
      <div className="mt-0 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 w-4/5 m-auto">
        {items.map((item) => (
          <div key={item.id}>
            <div className="relative border p-2 mt-10">
              <div className="relative h-72 w-full overflow-hidden rounded-lg ">
                <img
                  src={item.image}
                  alt="Product"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="relative mt-4">
                <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                <p className="mt-1 h-14 text-sm text-gray-700">
                  {item.description}
                </p>
                <p className="relative pt-1 text-sm font-semibold text-gray-700">
                  R. {item.price}
                </p>
              </div>
              <div className=" inset-x-0 top-3 flex h-12 items-end justify-between overflow-hidden p-4">
                <div>
                <Link to={`/items/${item.id}`}>
                <button className="text-red-600 text-sm">Edit</button>
                </Link>
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-30 opacity-50"
                />
                <button className="" onClick={()=>handleDelete(item.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="red"
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
              {item.sponsored ? (
                <div className="absolute inset-x-0 top-0 flex h-72 items-end inline justify-start overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 inline opacity-50"
                  />
                  <p className="relative text-sm font-medium text-gray-600">
                    Sponsored
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                      />
                    </svg>
                  </p>
                </div>
              ) : null}
            </div>
           

            <div className="mt-6">
              <a
                href={item.href}
                className="relative flex items-center justify-center rounded-md border border-green-500 bg-white py-1 px-8 text-sm font-medium text-green-500 hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                Add to Cart
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
