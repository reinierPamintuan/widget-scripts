// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: magic;

const data = await fetchData();

let mainWidget = createWidget(data);
Script.setWidget(mainWidget);
mainWidget.presentMedium();
Script.complete();



function createWidget(data) {
    let widget = new ListWidget();
    let currentBatteryLevel = Math.round(Device.batteryLevel()*100);
    let currentBrightnessLevel = Math.round(Device.screenBrightness()*100);
    const titleMessage = 'title';
    const backgroundColor = new Color("#242424");
    const NAME = "Rei";
    const CALENDAR_NAME = 'reinier.pamintuan@gmail.com'
    const FONT_NAME = 'Menlo';
    const FONT_SIZE = 11;
    const fontColor = new Font('Menlo', 11)
    const COLORS = {
        calendar: '#58D2F0',
        deviceStats: '#7AE7B9'
    }
    widget.setPadding(10, 15, 15, 10);
    widget.font = fontColor;
    widget.backgroundColor = backgroundColor;

    let widgetStack = widget.addStack();
    widgetStack.layoutVertically();
    widgetStack.spacing = 4;
    widgetStack.size = new Size(320, 0);
    
    const timeFormat = new DateFormatter();
    timeFormat.locale = "en";
    timeFormat.useNoDateStyle();
    timeFormat.useShortTimeStyle();
    
    const currentTime = widgetStack.addText(`Last Updated: ${timeFormat.string(new Date())}`);
    currentTime.textColor = Color.white();
    currentTime.textOpacity = 0.7;
    currentTime.font = new Font(FONT_NAME, FONT_SIZE);
    
    const phoneInfo = widgetStack.addText(`iPhone:~ ${NAME}$ info`);
    phoneInfo.textColor = Color.white();
    phoneInfo.font = new Font(FONT_NAME, FONT_SIZE);

    // console.log('data.calendarEvents!!!!!!!!',data.calendarEvents);
    const calendarEvents = widgetStack.addText(`📅 | Calendar ${getCalendarEventTitle(data.calendarEvents)}`);
    calendarEvents.textColor = new Color(COLORS.calendar);
    calendarEvents.font = new Font(FONT_NAME, FONT_SIZE);

    
    const deviceStats = widgetStack.addText(`📊 | ⚡ ${currentBatteryLevel}%, ☀ ${currentBrightnessLevel}%`);
    deviceStats.textColor = new Color(COLORS.deviceStats);
    deviceStats.font = new Font(FONT_NAME, FONT_SIZE);



    return widget;
}

async function getCalendarEvent(CALENDAR_NAME){
    const calendar = await Calendar.forEventsByTitle(CALENDAR_NAME);
    const events = await CalendarEvent.today([calendar]);
    const tomorrow = await CalendarEvent.tomorrow([calendar]);
    // console.log(calendar);
    // console.log(events);

    let eventCountToday = `Got ${events.length} events today`;
    let eventCountTomorrow = `Got ${tomorrow.length} events tomorrow`;

    // console.log(eventCountToday);
    // console.log(eventCountTomorrow);

    
    let upcomingEvents = events.concat(tomorrow)//.filter(e => (new Date(e.endDate)).getTime() >= (new Date()).getTime());
    // console.log(Object.keys(events));
    // console.log(Object.values(events));
    // let currentEvents = Object.values(events);
    // let tomorrowEvents = Object.values(tomorrow);
    // upcomingEvents = currentEvents.concat(tomorrowEvents);
    // upcomingEvents.sort()
    // console.log(Object.keys(upcomingEvents));
    return('I have returned');//upcomingEvents ? upcomingEvents[0] : null;
}

async function getCalendarEventTitle(calendarEvent){
    const timeFormatter = new DateFormatter();
    timeFormatter.locale = 'en';
    timeFormatter.useNoDateStyle();
    timeFormatter.useShortTimeStyle();
    // console.log('calendarEvent',calendarEvent);
    const eventTime = new Date(calendarEvent.startDate)
    // console.log('eventTime',eventTime);

    return `[${timeFormatter.string(eventTime)}] ${calendarEvent.title}`;
}

async function fetchData(){
    
    let calendarEvents = await getCalendarEvent('reinier.pamintuan@gmail.com');
    console.log('calendarEvents',Object.values(calendarEvents));
    return {
        calendarEvents,
        device:{
            battery: Math.round(Device.batteryLevel() * 100),
            brightness: Math.round(Device.screenBrightness() * 100)
        }
    };
}

