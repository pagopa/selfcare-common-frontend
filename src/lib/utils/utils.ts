export const formatDateAsLongString = (date: Date): string => {
    
    const ye = new Intl.DateTimeFormat('it', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('it', { month: 'long' }).format(date);
    const da = new Intl.DateTimeFormat('it', { day: '2-digit' }).format(date);

    return `${da} ${mo} ${ye}`;
};