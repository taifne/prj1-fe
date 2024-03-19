export function transformTime(minutes) {
    if (minutes < 60) {
        return minutes + " minutes";
    } else if (minutes < 1440) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        if (remainingMinutes === 0) {
            return hours + " hours";
        } else {
            return hours + " hours "// + remainingMinutes + " minutes";
        }
    } else if (minutes < 10080) {
        const days = Math.floor(minutes / 1440);
        const remainingHours = Math.floor((minutes % 1440) / 60);
        const remainingMinutes = minutes % 60;
        if (remainingHours === 0 && remainingMinutes === 0) {
            return days + " days";
        } else if (remainingHours === 0) {
            return days + " days " //+ remainingMinutes + " minutes";
        } else if (remainingMinutes === 0) {
            return days + " days " //+ remainingHours + " hours";
        } else {
            return days + " days " //+ remainingHours + " hours " + remainingMinutes + " minutes";
        }
    } else if (minutes < 43800) {
        const weeks = Math.floor(minutes / 10080);
        const remainingDays = Math.floor((minutes % 10080) / 1440);
        const remainingHours = Math.floor((minutes % 1440) / 60);
        const remainingMinutes = minutes % 60;
        if (remainingDays === 0 && remainingHours === 0 && remainingMinutes === 0) {
            return weeks + " weeks";
        } else if (remainingDays === 0 && remainingHours === 0) {
            return weeks + " weeks " //+ remainingMinutes + " minutes";
        } else if (remainingDays === 0) {
            return weeks + " weeks " //+ remainingHours + " hours " + remainingMinutes + " minutes";
        } else {
            return weeks + " weeks " //+ remainingDays + " days " + remainingHours + " hours " + remainingMinutes + " minutes";
        }
    } else if (minutes < 525600) {
        const months = Math.floor(minutes / 43800);
        const remainingWeeks = Math.floor((minutes % 43800) / 10080);
        const remainingDays = Math.floor((minutes % 10080) / 1440);
        const remainingHours = Math.floor((minutes % 1440) / 60);
        const remainingMinutes = minutes % 60;
        if (remainingWeeks === 0 && remainingDays === 0 && remainingHours === 0 && remainingMinutes === 0) {
            return months + " months";
        } else if (remainingWeeks === 0 && remainingDays === 0 && remainingHours === 0) {
            return months + " months " //+ remainingMinutes + " minutes";
        } else if (remainingWeeks === 0 && remainingDays === 0) {
            return months + " months " //+ remainingHours + " hours " + remainingMinutes + " minutes";
        } else if (remainingWeeks === 0) {
            return months + " months " //+ remainingDays + " days " + remainingHours + " hours " + remainingMinutes + " minutes";
        } else {
            return months + " months " //+ remainingWeeks + " weeks " + remainingDays + " days " + remainingHours + " hours " + remainingMinutes + " minutes";
        }
    } else {
        const years = Math.floor(minutes / 525600);
        const remainingMonths = Math.floor((minutes % 525600) / 43800);
        const remainingWeeks = Math.floor((minutes % 43800) / 10080);
        const remainingDays = Math.floor((minutes % 10080) / 1440);
        const remainingHours = Math.floor((minutes % 1440) / 60);
        const remainingMinutes = minutes % 60;
        if (remainingMonths === 0 && remainingWeeks === 0 && remainingDays === 0 && remainingHours === 0 && remainingMinutes === 0) {
            return years + " years";
        } else if (remainingMonths === 0 && remainingWeeks === 0 && remainingDays === 0 && remainingHours === 0) {
            return years + " years " //+ remainingMinutes + " minutes";
        } else if (remainingMonths === 0 && remainingWeeks === 0 && remainingDays === 0) {
            return years + " years " //+ remainingHours + " hours " + remainingMinutes + " minutes";
        } else if (remainingMonths === 0 && remainingWeeks === 0) {
            return years + " years " //+ remainingDays + " days " + remainingHours + " hours " + remainingMinutes + " minutes";
        } else if (remainingMonths === 0) {
            return years + " years " //+ remainingWeeks + " weeks " + remainingDays + " days " + remainingHours + " hours " + remainingMinutes + " minutes";
        } else {
            return years + " years " //+ remainingMonths + " months " + remainingWeeks + " weeks " + remainingDays + " days " + remainingHours + " hours " + remainingMinutes + " minutes";
        }
    }
}
export const timeDifferencefromPresent = (value) => {
    const timestampDate = new Date(value);
    const currentTime = new Date();
    const timeDifferenceInMinutes = Math.floor(
        (currentTime.getTime() - timestampDate.getTime()) /
        (1000 * 60)
    );
    return timeDifferenceInMinutes;
}