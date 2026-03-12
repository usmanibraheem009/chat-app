export const formattedDate = (timestamp: any) => {
    if (!timestamp) return '';

    // Handle Firestore timestamp or JS Date
    const date: Date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const today = new Date();

    // Only keep year, month, day
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const messageDateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const dayDifference = Math.floor(
        (todayOnly.getTime() - messageDateOnly.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (dayDifference === 0) {
        return 'Today';
    }

    if (dayDifference === 1) {
        return 'Yesterday';
    }

    if (today.getFullYear() === date.getFullYear()) {
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
        });
    }

    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};
export const formattedTime = (timestamp: any) => {
    if (!timestamp) return;

    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);

    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};