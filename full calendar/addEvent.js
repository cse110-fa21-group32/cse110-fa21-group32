document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var jsonRecipe = 'https://introweb.tech/assets/json/ghostCookies.json'
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridWeek',
      headerToolbar: {
        center: 'addEventButton'
      },
      customButtons: {
        addEventButton: {
          text: 'add event...',
          click: function() {
            var dateStr = prompt('Enter a date in YYYY-MM-DD format');
            var date = new Date(dateStr + 'T00:00:00'); // will be in local time
  
            if (!isNaN(date.valueOf())) { // valid?
              calendar.addEvent({
                title : fetch(jsonRecipe),
                start: date,
                allDay: true
              });
              alert('Great. Now, update your database...');
            } else {
              alert('Invalid date.');
            }
          }
        }
      },

      // Click Event
      eventClick: function(info) {
        var eventObj = info.event;
  
        if (eventObj.url) {
          alert(
            'Clicked ' + eventObj.title + '.\n' +
            'Will open ' + eventObj.url + ' in a new tab'
          );
  
          window.open(eventObj.url);
  
          info.jsEvent.preventDefault(); // prevents browser from following link in current tab.
        } else {
          alert('Delete ' + eventObj.title + ' from your schedule?');
          eventObj.remove()
        }
      }/*,
      events: function(info, successCallback, failureCallback) {
        req.get('myxmlfeed.php')
          .type('xml')
          .query({
            start: info.start.valueOf(),
            end: info.end.valueOf()
          })
          .end(function(err, res) {
    
            if (err) {
              failureCallback(err);
            } else {
    
              successCallback(
                Array.prototype.slice.call( // convert to array
                  res.getElementsByTagName('event')
                ).map(function(eventEl) {
                  return {
                    title: eventEl.getAttribute('title'),
                    start: eventEl.getAttribute('start')
                  }
                })
              )
            }
          })
      }*/

    });
    
    fetch(jsonRecipe) 
        .then(response => response.json())
        .then(data => console.log(data))
    
  
    calendar.render();
  });