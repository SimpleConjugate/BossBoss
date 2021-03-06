'use strict';

angular.module('bossBossApp')
.filter('times', function () {
    function milToNorm(mil, shouldAmPm) {
        if (mil === undefined) {
            return;
        }
        var t = mil.split(':'),
            hours = parseInt(t[0], 10),
            minutes = t[1];

        var ampm = hours > 11 ? 'pm' : 'am';
        hours = ((hours + 11) % 12) + 1;
        if (shouldAmPm !== undefined && shouldAmPm) {
            return hours + ':' + minutes + ampm;
        }
        return hours + ':' + minutes;


    }

    return function(c) {
        if (angular.isUndefined(c)) {
            return;
        }

        if (c.info !== undefined) {
            return c.info;
        }

        var days = Object.keys(c);
        var firstDay = days[0];
        days = days.join('');
        if (days === 'RT') {
            days = 'TR';
        }
        return days + ' ' + milToNorm(c[firstDay].start) + '-' + milToNorm(c[firstDay].end);
    };
});
