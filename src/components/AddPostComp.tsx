import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios"
const url = import.meta.env.VITE_URL_POST

import { useNavigate } from "react-router-dom";

import * as React from "react";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddPostComp = () => {
  const navigate = useNavigate()
  const [date, setDate] = React.useState<string>("");
  const [event, setEvent] = React.useState("")
  const [room, setRoom] = React.useState("")
  const [clockStart, setClockStart] = React.useState({hours: 0, minutes: 0})
  const [clockEnd, setClockEnd] = React.useState({hours: 0, minutes: 0})

  const handleRoomChange = (e: any) => {
    setRoom(e)
  }

  const handleDate = (e: any) => {
    setDate(format(e,"yyyy-MM-dd"))
  }

  const handleHourStart = (e: any) => {
    setClockStart({ ...clockStart, hours: parseInt(e.target.value)})
  }

  const handleMinStart = (e: any) => {
    setClockStart({ ...clockStart, minutes: parseInt(e.target.value)})
  }

  const handleHourEnd = (e: any) => {
    setClockEnd({ ...clockEnd, hours: parseInt(e.target.value)})
  }

  const handleMinEnd = (e: any) => {
    setClockEnd({ ...clockEnd, minutes: parseInt(e.target.value)})
  }

  const axiosWithToken = axios.create({
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json"
    }
  })


  const body = {
    date: date,
    event: event,
    room: room,
    clockStart: clockStart,
    clockEnd: clockEnd
  }

  const submit = async () => {
    const response = await axiosWithToken.post(url, body)
    if(response.data.msg == "input booking berhasil"){
      navigate("/dashboard")
    }
    console.log(response.data)
  }

  return (
    <div className="flex items-center justify-center my-20">
      <div className="w-full">
        <div className="text-3xl font-bold text-center">Detail Booking</div>
        <div className="px-96">
          <div className="items-start mt-4 text-left">
            <div className="text-lg font-bold">Keperluan</div>
            <Input className="w-full mt-2 focus-visible:ring-transparent" placeholder="Meeting" onChange={(e)=>setEvent(e.target.value)}/>
          </div>
        </div>
        <div className="flex justify-between mx-96">
          <div className="">
            <div className="items-start mt-4 text-left">
              <div className="text-lg font-bold">Tanggal</div>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] mt-2 justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {date ? format(parseISO(date), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date ? parseISO(date) : undefined}
                      onSelect={handleDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <div className="">
            <div className="items-start mt-4 text-left">
              <div className="text-lg font-bold">Ruangan</div>
              <div>
                <Select onValueChange={handleRoomChange}>
                  <SelectTrigger className="w-[280px] mt-2 focus-visible:ring-transparent">
                    <SelectValue placeholder="Pilih ruangan..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ruang Rapat F3" >
                      Ruang Rapat F3
                    </SelectItem>
                    <SelectItem value="Ruang Rapat F6">
                      Ruang Rapat F6
                    </SelectItem>
                    <SelectItem value="Ruang Kolaborasi Hakim">
                      Ruang Kolaborasi Hakim
                    </SelectItem>
                    <SelectItem value="Ruang Kolaborasi Pegawai">
                      Ruang Kolaborasi Pegawai
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4 mx-96">
          <div className="w-[280px]">
            <div className="text-lg font-bold">Jam Mulai</div>
            <div className="w-[280px] border mt-2 bg-white rounded-lg p-1.5">
              <div className="flex justify-center">
                <select
                  name="hours"
                  className="text-lg bg-transparent outline-none appearance-none"
                  value={clockStart.hours}
                  onChange={handleHourStart}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                ))}
                </select>
                <span className="ml-10 text-xl">:</span>
                <select
                  name="minutes"
                  className="ml-10 text-lg bg-transparent outline-none appearance-none"
                  value={clockStart.minutes}
                  onChange={handleMinStart}
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i * 5} value={i * 5}>{(i * 5).toString().padStart(2, '0')}</option>
                ))}
                </select>
              </div>
            </div>
          </div>
          <div className="w-[280px]">
            <div className="text-lg font-bold">Jam Berakhir</div>
            <div className="w-[280px] border mt-2 bg-white rounded-lg p-1.5">
              <div className="flex justify-center">
                <select
                  name="hours"
                  className="text-lg bg-transparent outline-none appearance-none"
                  value={clockEnd.hours}
                  onChange={handleHourEnd}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                   <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                ))}
                </select>
                <span className="ml-10 text-xl">:</span>
                <select
                  name="minutes"
                  className="ml-10 text-lg bg-transparent outline-none appearance-none"
                  value={clockEnd.minutes}
                  onChange={handleMinEnd}
                >
                  {Array.from({ length: 12 }, (_, i) => (
                   <option key={i * 5} value={i * 5}>{(i * 5).toString().padStart(2, '0')}</option>
                ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 px-96">
          <Button className="w-full mt-4" onClick={submit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default AddPostComp;