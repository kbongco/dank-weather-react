import { Center, Flex } from "@mantine/core";
import { getCurrentDate } from "../utils/getCurrentDate";
import { useEffect, useState } from "react";

export default function HolidaysComponent(holidays) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const currentDate = getCurrentDate(day, month);
  const [holidayGif, setHolidayGifs] = useState('');


  const filterHolidaysByDate = (currentDate) => {
    const filtered = holidays.holidays.popCultureHolidaysAndEvents.find((holiday) => {
      return holiday.holidayDate.includes(currentDate);
    })
    return filtered ? filtered.holidayName : null;
  }

  const filteredHolidays = filterHolidaysByDate(currentDate);

  const aboutDescription = (currentDate) => {
    const filteredAbout = holidays.holidays.popCultureHolidaysAndEvents.find((holiday) => {
      return holiday.holidayDate.includes(currentDate);
    });
    return filteredAbout ? <p>{filteredAbout.about}</p> : null;
  }

  // Make functions above DRY


  useEffect(() => {
    if (filteredHolidays !== null) {
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${filteredHolidays}&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`).then((res) => {
        return res.json();
      }).then((data) => {
        setHolidayGifs(data.data[0].embed_url);
      })
    } else {
      fetch(`https://api.giphy.com/v1/gifs/random?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&tag=&rating=g`).then((res) => {
        return res.json();
      }).then((data) => {
        setHolidayGifs(data.data.embed_url);
      })
    }
  }, [filteredHolidays])

  return (
    <>
      <div>
        <Center>
          <h2>Todays Date is {currentDate}, {year}</h2>
        </Center>
        {filteredHolidays !== null ? <div>
          <h2>We have a holiday today it is:
            {filteredHolidays}
          </h2>
          {aboutDescription(currentDate)}
        </div> : <h2>
          There are no holidays today</h2>}
        <Flex
          justify="center">
          <iframe src={holidayGif} height="200" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
        </Flex>
      </div>
    </>
  )
}