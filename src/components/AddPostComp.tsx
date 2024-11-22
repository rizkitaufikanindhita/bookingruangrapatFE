import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
const url = import.meta.env.VITE_URL_POST;

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
  const navigate = useNavigate();
  const [date, setDate] = React.useState<string>("");
  const [event, setEvent] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [clockStart, setClockStart] = React.useState({ hours: 0, minutes: 0 });
  const [clockEnd, setClockEnd] = React.useState({ hours: 0, minutes: 0 });
  const [pic, setPic] = React.useState("-");
  const [kapasitas, setKapasitas] = React.useState("-");
  const [rapat, setRapat] = React.useState("");
  const [catatan, setCatatan] = React.useState("-");

  const handleRoomChange = (e: any) => {
    setRoom(e);
  };

  const handleRapatChange = (e: any) => {
    setRapat(e);
  };

  const handleDate = (e: any) => {
    setDate(format(e, "yyyy-MM-dd"));
  };

  const handleHourStart = (e: any) => {
    setClockStart({ ...clockStart, hours: parseInt(e.target.value) });
  };

  const handleMinStart = (e: any) => {
    setClockStart({ ...clockStart, minutes: parseInt(e.target.value) });
  };

  const handleHourEnd = (e: any) => {
    setClockEnd({ ...clockEnd, hours: parseInt(e.target.value) });
  };

  const handleMinEnd = (e: any) => {
    setClockEnd({ ...clockEnd, minutes: parseInt(e.target.value) });
  };

  const axiosWithToken = axios.create({
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });

  const body = {
    date: date,
    event: event,
    room: room,
    clockStart: clockStart,
    clockEnd: clockEnd,
    pic: pic,
    kapasitas: kapasitas,
    rapat: rapat,
    catatan: catatan,
  };

  const submit = async () => {
    if (!date || !event || !room || !rapat) {
      alert(
        "Cek lagi tanggal, keperluan, ruangan, jam mulai, jam berakhir, jenis rapat. Tidak boleh kosong",
      );
    }
    const response = await axiosWithToken.post(url, body);
    if (response.data.msg == "input booking berhasil") {
      navigate("/dashboard");
    }

    await axios.post("https://sheetdb.io/api/v1/oa27fpuy86u1m", {
      Keperluan: event,
      Tanggal: format(parseISO(date), "dd-MM-yyyy"),
      Ruangan: room,
      Jam_Mulai: clockStart.hours + ":" + clockStart.minutes,
      Jam_Berakhir: clockEnd.hours + ":" + clockEnd.minutes,
      PIC: pic,
      Kapasitas: kapasitas,
      Jenis_Rapat: rapat,
      Catatan_Tambahan: catatan,
    });

    console.log(response.data);
  };

  return (
    <div className="flex items-center justify-center mt-10 mb-20">
      <div className="w-full">
        <div className="text-xl md:text-3xl font-bold text-center">
          Detail Booking
        </div>
        <div className="px-5 md:px-96">
          <div className="items-start mt-4 text-left">
            <div className="text-lg font-bold">Keperluan</div>
            <Input
              className="w-full mt-2 focus-visible:ring-transparent"
              placeholder="Meeting"
              onChange={(e) => setEvent(e.target.value)}
            />
          </div>
        </div>
        <div className="md:flex md:justify-between px-5 md:px-0 md:mx-96">
          <div className="">
            <div className="items-start mt-4 text-left">
              <div className="text-lg font-bold">Tanggal</div>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full md:w-[280px] mt-2 justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {date ? (
                        format(parseISO(date), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
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
                  <SelectTrigger className="w-full md:w-[280px] mt-2 focus-visible:ring-transparent">
                    <SelectValue placeholder="Pilih ruangan..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ruang Rapat F3">
                      Ruang Rapat F3
                    </SelectItem>
                    <SelectItem value="Ruang Rapat F6">
                      Ruang Rapat F6
                    </SelectItem>
                    <SelectItem value="Ruang Rapat F5">
                      Ruang Rapat F5
                    </SelectItem>
                    <SelectItem value="Ruang Kolaborasi Hakim">
                      Ruang Kolaborasi Hakim
                    </SelectItem>
                    <SelectItem value="Ruang Kolaborasi Pegawai">
                      Ruang Kolaborasi Pegawai
                    </SelectItem>
                    <SelectItem value="Ruang Rapat F2">
                      Ruang Rapat F2
                    </SelectItem>
                    <SelectItem value="Ruang Assessment F5">
                      Ruang Assessment F5
                    </SelectItem>
                    <SelectItem value="Ruang Assessment F6">
                      Ruang Assessment F6
                    </SelectItem>
                    <SelectItem value="Ruang Serbaguna A5">
                      Ruang Serbaguna A5
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex md:justify-between mt-4 mx-5 md:mx-96">
          <div className="w-full md:w-[280px]">
            <div className="text-lg font-bold">Jam Mulai</div>
            <div className="w-full md:w-[280px] border mt-2 bg-white rounded-lg p-2">
              <div className="flex justify-center">
                <select
                  name="hours"
                  className="text-lg bg-transparent outline-none appearance-none"
                  value={clockStart.hours}
                  onChange={handleHourStart}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>
                      {i.toString().padStart(2, "0")}
                    </option>
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
                    <option key={i * 5} value={i * 5}>
                      {(i * 5).toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[280px]">
            <div className="text-lg font-bold">Jam Berakhir</div>
            <div className="w-full md:w-[280px] border mt-2 bg-white rounded-lg p-2">
              <div className="flex justify-center">
                <select
                  name="hours"
                  className="text-lg bg-transparent outline-none appearance-none"
                  value={clockEnd.hours}
                  onChange={handleHourEnd}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>
                      {i.toString().padStart(2, "0")}
                    </option>
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
                    <option key={i * 5} value={i * 5}>
                      {(i * 5).toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 md:px-96">
          <div className="items-start mt-4 text-left">
            <div className="text-lg font-bold">Penanggungjawab Ruang/PIC</div>
            <Input
              className="w-full mt-2 focus-visible:ring-transparent"
              placeholder="Penanggungjawab"
              onChange={(e) => setPic(e.target.value)}
            />
          </div>
        </div>
        <div className="px-5 md:px-96">
          <div className="items-start mt-4 text-left">
            <div className="text-lg font-bold">Kapasitas</div>
            <Input
              className="w-full mt-2 focus-visible:ring-transparent"
              placeholder="Jumlah Pengguna"
              onChange={(e) => setKapasitas(e.target.value)}
            />
          </div>
        </div>

        <div className="md:flex md:justify-between px-5 md:px-0 md:mx-96">
          <div className="">
            <div className="items-start mt-4 text-left">
              <div className="text-lg font-bold">Jenis Rapat</div>
              <div>
                <Select onValueChange={handleRapatChange}>
                  <SelectTrigger className="w-full md:w-[280px] mt-2 focus-visible:ring-transparent">
                    <SelectValue placeholder="Pilih Jenis Rapat..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Offline">Offline</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="">
            <div className="items-start mt-4 text-left">
              <div className="text-lg font-bold">Catatan Tambahan</div>
              <div className="w-full md:w-[280px]">
                <Input
                  className="w-full mt-2 focus-visible:ring-transparent"
                  placeholder="e.g Tambahan Monitor, Kursi"
                  onChange={(e) => setCatatan(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-2 px-5 md:px-96">
          <Button className="w-full mt-4" onClick={submit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPostComp;
