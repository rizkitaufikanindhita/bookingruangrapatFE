import axios from "axios"
import { useEffect, useState } from "react"
import AddButtonComp from "./AddButtonComp"
import { useNavigate } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
const url = import.meta.env.VITE_URL_GET
const urlDelete = import.meta.env.VITE_URL_DELETE

const DashboardComp = () => {
  const navigate = useNavigate()
  type clockType = {
    hours: number,
    minutes: number
  }

  type dataType = {
    _id: String,
    day: String,
    date: String,
    event: String,
    clockStart: clockType,
    clockEnd: clockType,
    room: String
  }
  const [booking, setBooking] = useState<dataType[]>([])

  const axiosWithToken = axios.create({
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json"
    }
  })

  const fetchData = async() => {
    const response = await axiosWithToken.get(url)
    setBooking(response.data.msg)
  }

  const [loading, setLoading] = useState(true)

  const deleteAutoBookingList = async () => {
    const currentDate = new Date().getTime();

    for(let i=0;i<booking.length;i++){
      const millisecondsInOneDay = 24 * 60 * 60 * 1000
      if(parseInt(booking[i].date.toString()) < (currentDate - millisecondsInOneDay)){
        await axiosWithToken.delete(`${urlDelete}/${booking[i]._id}`)
      } 
    }
    window.location.reload()
  };

  useEffect(() => {
      setLoading(true);
      fetchData();
      setLoading(false);
  }, []);

  if(loading == true){
    return (
    <div>Loading...</div>
    )
  }

  const formatDate = (epochMillis: number) => {
    const date = new Date(epochMillis);
    return date.toLocaleDateString("en-GB"); // Tanggal-bulan-tahun (contoh: 01/01/2023)
  };

  const formatTime = (clock: clockType) => {
    const formattedHours = clock.hours < 10 ? `0${clock.hours}` : clock.hours;
    const formattedMinutes = clock.minutes === 0 ? `${clock.minutes}0` : clock.minutes;
    return `${formattedHours}:${formattedMinutes}`;
  };

  const getDayFromDate = (day: string) => {
    const daysMap: { [key: string]: string } = {
        "monday": "Senin",
        "tuesday": "Selasa",
        "wednesday": "Rabu",
        "thursday": "Kamis",
        "friday": "Jumat",
        "saturday": "Sabtu",
        "sunday": "Minggu"
    };
    return daysMap[day.toLowerCase()]; // Mengembalikan "minggu" jika tidak ada pasangan kunci yang cocok
};

  const deleteTask = async (e: any) => {
    await axiosWithToken.delete(`${urlDelete}/${e}`)
    alert("booking berhasil dihapus")
    window.location.reload()
  }

  return(
<div>
    <div className="flex justify-center items-center">
    <div className="flex space-x-4 p-5">
      {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map((hari) => {
        const meetingsForDay = booking
            .filter((book) => getDayFromDate(book.day.toString()) === hari)
            .sort((a,b)=>{
              const dateComparison = parseInt(a.date.toString()) - parseInt(b.date.toString())
              if(dateComparison !== 0) return dateComparison;

              if (a.clockStart.hours !== b.clockStart.hours) {
                return a.clockStart.hours - b.clockStart.hours;
            }
              return a.clockStart.minutes - b.clockStart.minutes;
            });
            // benerin lagi urutannya
        return (
          <div key={hari} className="flex flex-col border p-5 rounded-lg mt-3 w-56 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_10px]">
            <div className="text-center font-bold text-2xl">{hari}</div>
            <div className="flex flex-col space-y-3 mt-3">
              {meetingsForDay.length > 0 ? (
                meetingsForDay.map((book, index) => (
                  <div key={index} className="border p-3 rounded-lg bg-gradient-to-br from-slate-400 to-slate-300 text-slate-950 shadow-[rgba(13,_38,_76,_0.19)_0px_5px_7px]">
                    <div className="flex justify-end ml-24 scale-75">
                          {/* update */}
                          <button className="mx-3" onClick={()=> navigate(`/edit?id=${book._id}`)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
</button>
                          {/* delete */}
                          <button onClick={()=>deleteTask(book._id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
</button>
                    </div>
                    {/* <div>{getDayFromDate(book.day.toString())}</div> */}
                    <div className="font-bold text-xl">{formatDate(parseInt(book.date.toString()))}                    </div>
                    <Separator className="my-3"/> 
                    <div className="font-bold">{book.event.toUpperCase()}</div>
                    <div>{formatTime(book.clockStart)} - {formatTime(book.clockEnd)}</div>
                    <div>{book.room}</div>
                  </div>
                ))
              ) : (
                <div className="text-center">Tidak ada meeting</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
</div>

  )
}

export default DashboardComp 
