import moment from "moment";
import knex from "knexClient";

export default async function getAvailabilities(date, numberofDays = 7) {
  const availabilities = new Map();
  for (let i = 0; i < numberofDays; ++i) {
    const tmpDate = moment(date).add(i, "days");
    let index = parseInt(tmpDate.format("d"));
    // Incerementing index as it resets after 7 days
    if( i > 6) index = index+7;
    availabilities.set(index, {
      date: tmpDate.toDate(),
      slots: []
    });
  }


  const events = await knex
    .select("kind", "starts_at", "ends_at", "weekly_recurring")
    .from("events")
    .where(function() {
      this.where("weekly_recurring", true).orWhere("ends_at", ">", +date);
    }).orderBy('kind', 'DESC');

  for (const event of events) {
    for (
      let date = moment(event.starts_at);
      date.isBefore(event.ends_at);
      date.add(30, "minutes")
    ) {
      let index = parseInt(date.format("d"));
      const day = availabilities.get(index);
      if (event.kind === "opening") {
        day.slots.push(date.format("H:mm"));
      } else if (event.kind === "appointment") {
        day.slots = day.slots.filter(
          slot => slot.indexOf(date.format("H:mm")) === -1
        );
      }
    }
  }

  // console.log('Modified Availabilities>>>', availabilities,'SLOTS>>>>', Array.from(availabilities.values()));

  return Array.from(availabilities.values())
}
