import axios from "axios"
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
const url = import.meta.env.VITE_URL_GET

const DashboardComp = () => {
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

  const fetchData = async () => {
    const response = await axiosWithToken.get(url)
    setBooking(response.data.msg)
  }

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  if (loading == true) {
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

  return (
    <div>
      <div className="md:flex md:justify-center items-center">
        <div className="md:flex space-x-1 md:space-x-4 p-5">
          {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map((hari) => {
            const meetingsForDay = booking
              .filter((book) => getDayFromDate(book.day.toString()) === hari)
              .sort((a, b) => {
                const dateComparison = parseInt(a.date.toString()) - parseInt(b.date.toString())
                if (dateComparison !== 0) return dateComparison;

                if (a.clockStart.hours !== b.clockStart.hours) {
                  return a.clockStart.hours - b.clockStart.hours;
                }
                return a.clockStart.minutes - b.clockStart.minutes;
              });
            // benerin lagi urutannya
            return (
              <div key={hari} className="flex flex-col border p-5 rounded-lg mt-3 w-full md:w-56 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_10px]">
                <div className="text-center font-bold text-2xl">{hari}</div>
                <div className="flex flex-col space-y-3 mt-3">
                  {meetingsForDay.length > 0 ? (
                    meetingsForDay.map((book, index) => (
                      <div key={index} className="border p-3 rounded-lg bg-gradient-to-br from-slate-400 to-slate-300 text-slate-950 shadow-[rgba(13,_38,_76,_0.19)_0px_5px_7px]">
                        <div className="font-bold text-xl">{formatDate(parseInt(book.date.toString()))}                    </div>
                        <Separator className="my-3" />
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
