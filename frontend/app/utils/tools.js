
export function formatDateLocal(utcString) {
    if (!utcString) return "";

    return new Intl.DateTimeFormat(undefined, {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).format(new Date(utcString));
}


