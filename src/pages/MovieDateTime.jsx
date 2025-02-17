import React, { useEffect, useState } from "react";
import { TfiAngleRight } from "react-icons/tfi";
import { TfiAngleLeft } from "react-icons/tfi";
import { IoIosArrowDown } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { FaLanguage } from "react-icons/fa";
import { GiSelfLove } from "react-icons/gi";
import { TfiTicket } from "react-icons/tfi";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { IoMdHeartEmpty } from "react-icons/io";
import axios from "axios";

const MovieDateTime = () => {
    const params = useParams();
    const { id } = params;
    const [showDates, setShowDates] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const getShowDates = async ()=>{
        try {
            const resp = await axios.get(`http://localhost:5000/api/v1/airingdate/${id}`)
            console.log(resp.data.data)
            if(resp.status === 200){
                setLoading();
                setShowDates(resp.data.data)
            }
        } catch (error) {
            console.log(` Error fetching showDates:`, error);
        }
    };

    useEffect(()=>{
        getShowDates();
    },[])
  return (
    <div>
      <div className="mt-[50px] lg:w-[80%] md:mt-[80px] w-[90%] mx-auto">
        <div>
          <p className="lg:text-[38px] text-[18px] font-semibold pt-5">
            Kraven: The Hunter (4DX) - English
          </p>
        </div>
        <div className="flex lg:gap-2 gap-1 my-2">
          <div className="rounded-full text-gray-400 border border-black/40 flex items-center justify-center lg:size-5 size-4">
            <p className="text-center text-xs">A</p>
          </div>
          <div className="rounded-full text-gray-400 border flex justify-center items-center border-gray-400 lg:px-2 px-1">
            <p className="text-center text-gray-400 lg:text-[10px] text-[8px]">
              ACTION
            </p>
          </div>
          <div className="rounded-full text-gray-400 border flex justify-center items-center border-gray-400 lg:px-2 px-1">
            <p className="text-center text-gray-400 lg:text-[10px] text-[8px]">
              ADVENTURE
            </p>
          </div>
          <div className="rounded-full text-gray-400 border flex justify-center items-center border-gray-400 lg:px-2 px-1">
            <p className="text-center text-gray-400 lg:text-[10px] text-[8px]">
              DRAMA
            </p>
          </div>
        </div>
      </div>
      <hr className="mt-[20px] border border-gray-200" />
      <div className="lg:w-[80%] w-[90%] mx-auto block relative lg:flex justify-between mt-5 pb-1">
        <div className="flex overflow-x-scroll lg:overflow-hidden gap-2 items-center">
          <TfiAngleLeft className="absolute left-0 lg:relative cursor-pointer" />
          <div className="flex gap-1 items-center">
            <button className="bg-purple-800 text-white rounded-lg px-4 py-1 flex flex-col items-center justify-center ">
              <p className="text-[11px] leading-none">THU</p>
              <p className="font-semibold text-[16px]">02</p>
              <p className="text-[11px] leading-none">JAN</p>
            </button>
            <button className="focus:bg-purple-800 hover:text-purple-800 focus:text-white rounded-lg px-4 py-1 flex flex-col items-center justify-center ">
              <p className="text-[11px] leading-none">FRI</p>
              <p className="font-semibold text-[16px]">03</p>
              <p className="text-[11px] leading-none">JAN</p>
            </button>
            <button className="focus:bg-purple-800 hover:text-purple-800 focus:text-white rounded-lg px-4 py-1 flex flex-col items-center justify-center ">
              <p className="text-[11px] leading-none">SAT</p>
              <p className="font-semibold text-[16px]">04</p>
              <p className="text-[11px] leading-none">JAN</p>
            </button>
            <button className="focus:bg-purple-800 hover:text-purple-800 focus:text-white rounded-lg px-4 py-1 flex flex-col items-center justify-center ">
              <p className="text-[11px] leading-none">SUN</p>
              <p className="font-semibold text-[16px]">05</p>
              <p className="text-[11px] leading-none">JAN</p>
            </button>
            <button className="focus:bg-purple-800 hover:text-purple-800 focus:text-white rounded-lg px-4 py-1 flex flex-col items-center justify-center ">
              <p className="text-[11px] leading-none">MON</p>
              <p className="font-semibold text-[16px]">04</p>
              <p className="text-[11px] leading-none">JAN</p>
            </button>
            <button className="focus:bg-purple-800 hover:text-purple-800 focus:text-white rounded-lg px-4 py-1 flex flex-col items-center justify-center ">
              <p className="text-[11px] leading-none">SAT</p>
              <p className="font-semibold text-[16px]">04</p>
              <p className="text-[11px] leading-none">JAN</p>
            </button>
            <button className="focus:bg-purple-800 hover:text-purple-800 focus:text-white rounded-lg px-4 py-1 flex flex-col items-center justify-center ">
              <p className="text-[11px] leading-none">SAT</p>
              <p className="font-semibold text-[16px]">04</p>
              <p className="text-[11px] leading-none">JAN</p>
            </button>
            <button className="focus:bg-purple-800 hover:text-purple-800 focus:text-white rounded-lg px-4 py-1 flex flex-col items-center justify-center ">
              <p className="text-[11px] leading-none">SUN</p>
              <p className="font-semibold text-[16px]">05</p>
              <p className="text-[11px] leading-none">JAN</p>
            </button>
          </div>
          <TfiAngleRight className=" cursor-pointer right-0 absolute lg:relative" />
        </div>
        <div className="hidden lg:flex items-center">
          <div className="border-l border-r border-b-4 py-5 px-4 border-b-purple-800 flex items-center justify-center gap-2 font-semibold text-sm">
            English - 3D <IoIosArrowDown size={15} />
          </div>
          <div className="border-l border-r py-5 px-4 text-xs font-semibold flex items-center justify-center gap-2">
            Filter Price Range <IoIosArrowDown size={15} />
          </div>
          <div className="border-l border-r py-5 px-4 text-xs font-semibold">
            Filter Show Timings
          </div>
          <div className="border-l border-r py-5 px-4 text-xs font-semibold">
            <BiSearch className="text-xl text-black/50" />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 pb-10">
        <div className="pt-3 lg:w-[80%] w-[90%] mx-auto">
          <div className="bg-white ">
            <div className="flex gap-2 justify-end px-3 py-2">
              <div className="flex gap-1 items-center">
                <GoDotFill color="green" />
                <p className="text-[11px] text-black/50">AVAILABLE</p>
              </div>
              <div className="flex gap-1 items-center">
                <GoDotFill color="red" />
                <p className="text-[11px] text-black/50">FAST FILLING</p>
              </div>
              <div className="flex gap-1 items-center">
                <FaLanguage color="green" />
                <p className="text-[11px] text-black/50">SUBTITLES LANGUAGE</p>
              </div>
            </div>
            <div>
              <div className="lg:flex gap-3 items-start p-[30px] border-t">
                <div className="flex lg:block gap-2">
                  <div>
                    <IoMdHeartEmpty className="lg:text-lg text-black/40" />
                  </div>
                  <div className="lg:hidden flex w-full justify-between lg:gap-[50px] items-center">
                    <p className="text-sm font-semibold mb-4">
                      Galleria, Victoria Island, Lagos
                    </p>
                    <div className="flex gap-1 items-center text-gray-400 mt-[-14px]">
                      <MdInfoOutline />
                      <p className="text-[12px]">INFO</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="hidden lg:flex gap-[50px] items-center">
                    <p className="text-sm font-semibold mb-4">
                      Galleria, Victoria Island, Lagos
                    </p>
                    <div className="flex gap-1 items-center text-gray-400 mt-[-14px]">
                      <MdInfoOutline />
                      <p className="text-[12px]">INFO</p>
                    </div>
                  </div>
                  <div className="flex gap-6 mb-3">
                    <div className="flex gap-1 text-green-500">
                      <TfiTicket size={17} />
                      <p className="text-xs">M-Ticket</p>
                    </div>
                    <div className="flex gap-1 text-orange-400">
                      <IoFastFoodOutline size={17} />
                      <p className="text-xs">Food & Beverage</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-4 mt-2">
                    <Link to="/seat-page">
                      <div className="border border-gray-400 rounded text-[11px] lg:py-1 py-0 lg:px-5 px-3">
                        <p className="text-green-400">11:45 AM</p>
                        <p className="text-gray-400">DOLBY 7.1</p>
                      </div>
                    </Link>
                    <div className="border border-gray-400 rounded text-[11px] lg:py-1 py-0 lg:px-5 px-3">
                      <p className="text-green-400">5:25 PM</p>
                      <p className="text-gray-400">DOLBY 7.1</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center mt-3">
                    <GoDotFill color="yellow" />
                    <p className="text-gray-500 text-[13px]">
                      Non-cancellable{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:flex gap-3 items-start p-[30px] border-t">
                <div className="flex lg:block gap-2">
                  <div>
                    <IoMdHeartEmpty className="lg:text-lg text-black/40" />
                  </div>
                  <div className="lg:hidden flex w-full justify-between lg:gap-[50px] items-center">
                    <p className="text-sm font-semibold mb-4">
                      Galleria, Victoria Island, Lagos
                    </p>
                    <div className="flex gap-1 items-center text-gray-400 mt-[-14px]">
                      <MdInfoOutline />
                      <p className="text-[12px]">INFO</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="hidden lg:flex gap-[50px] items-center">
                    <p className="text-sm font-semibold mb-4">
                      Galleria, Victoria Island, Lagos
                    </p>
                    <div className="flex gap-1 items-center text-gray-400 mt-[-14px]">
                      <MdInfoOutline />
                      <p className="text-[12px]">INFO</p>
                    </div>
                  </div>
                  <div className="flex gap-6 mb-3">
                    <div className="flex gap-1 text-green-500">
                      <TfiTicket size={17} />
                      <p className="text-xs">M-Ticket</p>
                    </div>
                    <div className="flex gap-1 text-orange-400">
                      <IoFastFoodOutline size={17} />
                      <p className="text-xs">Food & Beverage</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-4 mt-2">
                    <Link to="/seat-page">
                      <div className="border border-gray-400 rounded text-[11px] lg:py-1 py-0 lg:px-5 px-3">
                        <p className="text-green-400">11:45 AM</p>
                        <p className="text-gray-400">DOLBY 7.1</p>
                      </div>
                    </Link>
                    <div className="border border-gray-400 rounded text-[11px] lg:py-1 py-0 lg:px-5 px-3">
                      <p className="text-green-400">5:25 PM</p>
                      <p className="text-gray-400">DOLBY 7.1</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center mt-3">
                    <GoDotFill color="yellow" />
                    <p className="text-gray-500 text-[13px]">
                      Non-cancellable{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[30px]">
            <p className="font-semibold text-[13px] text-gray-500">
              Privacy Note
            </p>
            <p className=" text-[11px] text-gray-500 mt-3">
              By using www.cincocinema.com(our website), you are fully accepting
              the Privacy Policy available at{" "}
              <span className="underline text-red-400 cursor-pointer">
                https://cincocinema.onrender.com/privacy
              </span>{" "}
              governing your access to cincocinema and provision of services by
              cincocinema to you. If you do not accept terms mentioned in the{" "}
              <span className="underline text-red-400 cursor-pointer">
                {" "}
                Privacy Policy
              </span>
              , you must not share any of your personal information and
              immediately exit cincocinema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDateTime;
