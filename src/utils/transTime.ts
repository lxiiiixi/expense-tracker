export default function transTime(timeString: string) {
    if (!timeString) return "";
    const [year, month] = timeString.split("-");
    let EnMonth = "";
    switch (month) {
        case "01":
            EnMonth = "January";
            break;
        case "02":
            EnMonth = "February";
            break;
        case "03":
            EnMonth = "March";
            break;
        case "04":
            EnMonth = "April";
            break;
        case "05":
            EnMonth = "May";
            break;
        case "06":
            EnMonth = "June";
            break;
        case "07":
            EnMonth = "July";
            break;
        case "08":
            EnMonth = "August";
            break;
        case "09":
            EnMonth = "September";
            break;
        case "10":
            EnMonth = "October";
            break;
        case "11":
            EnMonth = "November";
            break;
        case "12":
            EnMonth = "December";
            break;
        default:
            break;
    }
    return EnMonth;
}
