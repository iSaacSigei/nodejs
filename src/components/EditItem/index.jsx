import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function EditItem() {
  const [item, setItem] = useState([]);
  const [name, setName] = useState("");
  const [discount, setDicount] = useState("");
  const [price, setPrice] = useState(null);
  const [description, setDescriptions] = useState("");
  const [checkbox, setSponsored] = useState(false);
  const { id } = useParams();
  console.log(id);
  const toastMessage = () => {
    toast.success("Item Successfully Updated!", {
      position: toast.POSITION.TOP_CENTER,
      className: "toast-message",
    });
  };
  const nav = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:3000/api/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItem(data);
      });
  }, [id]);
  function handleSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:3000/api/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        discount: discount,
        price: price,
        description: description,
        sponsored: checkbox,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then(() => {
          toastMessage();
          setTimeout(() => {
            nav("/");
          }, 2000);
        });
      }
    });
  }

  return (
    <>
      <ToastContainer />
      <div className="bg-gradient-to-r from-purple-400">
        <div className="lg:grid grid-cols-2 lg:w-4/5 m-auto">
          <div>
            <div className="relative rounded p-2 mt-10">
              <div className="relative h-72 w-full overflow-hidden rounded-lg ">
                <img
                  src={item.image}
                  alt="Product"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="relative mt-4">
                <p className="mt-1 text-sm text-gray-500">{item.name}</p>
                <p className="mt-1 h-14 text-sm text-gray-700">
                  {item.description}
                </p>
                <p className="relative pt-1 text-sm font-semibold text-gray-700">
                  R. {item.price}
                </p>
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
          </div>
          <div className=" m-auto h-screen lg:p-10 sm:p-1 ">
            <form
              onSubmit={handleSubmit}
              className="lg:w-full sm:w-full m-auto"
            >
              <div className="lg:grid grid-cols-3">
                <div className="">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="product name"
                    className="mt-2 block w-1/2 rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="">
                  <label
                    htmlFor="Price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Product Price"
                    className="mt-2 block w-1/2 rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="">
                  <label
                    htmlFor="Discount"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Discount
                  </label>
                  <input
                    type="number"
                    name="dicount"
                    id="discount"
                    onChange={(e) => setDicount(e.target.value)}
                    placeholder="Discount"
                    required
                    className="mt-2 block w-1/2 rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="lg:flex items-center justify-start">
                <div className="mr-20">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    onChange={(e) => setDescriptions(e.target.value)}
                    placeholder="A brief description of the product"
                    className="mt-2 block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="flex h-6 items-center">
                  <label className="block text-sm font-medium leading-6 text-gray-900 pr-2">
                    Sponsored?
                  </label>
                  <input
                    id="Sponsored"
                    aria-describedby="Sponsored-item"
                    name="sponsored"
                    type="checkbox"
                    onChange={(e) => setSponsored(e.target.checked)}
                    className="h-4 w-4 pl-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 border-t p-4">
                <button
                  type="submit"
                  className="ml-3 rounded-md bg-gradient-to-r from-teal-500 to-cyan-500 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
