export const getTime = () => {
  let msg = "";
  const hours = new Date().getHours();
  if (hours <= 9) {
    msg = "早上";
  } else if (hours <= 12) {
    msg = "上午";
  } else if (hours <= 18) {
    msg = "下午";
  } else {
    msg = "晚上";
  }
  return msg;
};

export const deleteSecond = (time: string) => {
  const parts = time.split(":");
  const hours = parts[0];
  const minutes = parts[1];
  const newTime = `${hours}:${minutes}`;

  return newTime;
};

export const formatMinutes = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const displayH = String(h % 24).padStart(2, "0");
  const displayM = String(m).padStart(2, "0");
  // return h >= 24 ? `隔日${displayH}:${displayM}` : `${displayH}:${displayM}`;
  return `${displayH}:${displayM}`;
};

export const formatTime = (today: Date) => {
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // 月份从0开始，所以要加1
  const day = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

import { Schedule } from "@/types/schedule";
import moment from "moment";
export const formatDate = (row: any, column: any) => {
  const date = row.takeTime;
  let formattedDate;
  if (column.columnKey === "date") {
    formattedDate = moment(date).format("YYYY-MM-DD");
  }
  if (column.columnKey === "time") {
    formattedDate = moment(date).format("HH:mm:ss");
  }
  // 使用您想要的日期格式
  return formattedDate;
};

export const getNowWeekMinutes = () => {
  const now = new Date();
  const day = now.getDay(); // 0=日
  const week = day === 0 ? 7 : day;

  return now.getHours() * 60 + now.getMinutes() + (week - 1) * 1440;
};

export const getTodayWeek = () => {
  const today = new Date();
  const day = today.getDay(); // JS: 0=星期日, 1=星期一...
  return day === 0 ? 7 : day; // 將 0 (星期日) 轉成 7
};

export const minutesToTime = (minutes: number) => {
  const minutesInDay = 1440;
  minutes = minutes % minutesInDay; // 取得當天的分鐘數
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
};

export const mergeSchedule = (
  schedule: Schedule,
  schedules: Schedule[]
): Schedule => {
  // 若開始時間是 0（跨週開頭段）
  if (schedule.start_time === 0) {
    const match = schedules.find((s) => s.end_time === 10080);
    if (match) {
      schedule.start_time = match.start_time;
    }
  }

  // 若結束時間是 10080（跨週結尾段）
  else if (schedule.end_time === 10080) {
    const match = schedules.find((s) => s.start_time === 0);
    if (match) {
      schedule.end_time = match.end_time;
    }
  }

  return schedule;
};

export const mergeSchedules = (schedules: Schedule[]): Schedule[] => {
  if (!schedules || schedules.length === 0) return [];

  const crossEnd = schedules.find((s) => s.end_time === 10080);
  const crossStart = schedules.find((s) => s.start_time === 0);

  // 如果沒有形成跨週，直接回傳原 schedules（拷貝）
  if (!crossEnd || !crossStart) {
    return [...schedules];
  }

  // 合併成新的一筆
  const merged: Schedule = {
    ...crossEnd,
    start_time: crossEnd.start_time,
    end_time: crossStart.end_time + 10080,
  };

  // 移除 start_time === 0 與 end_time === 10080 的舊資料
  const filtered = schedules.filter((s) => s !== crossEnd && s !== crossStart);
  return [...filtered, merged];
};

// 1. 資料庫取值篩選，資料庫壓力較大
// 2. 跨夜問題
// 3. 時間格式問題，例如:沒辦法顯示 24:00，所以下拉選拉要自己寫
// 4. 時間重疊問題，例如週一 22:00-隔日02:00，週二 01:00-05:00
// 5. 跨週問題，例如週日 22:00-隔週一 02:00
// 6. 時間是否營業，店家是否手動關閉
// 7. foodpanda 的時間
