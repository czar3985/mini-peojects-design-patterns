/* STUDENT APPLICATION */
$(function () {
    var model = {
        init: function () {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },

        update: function (obj) {
            localStorage.attendance = JSON.stringify(obj);
        },

        getAttendance: function () {
            return JSON.parse(localStorage.attendance);
        }
    };

    var octopus = {
        init: function () {
            model.init();
            view.init();
        },

        updateAttendance: function (attendance) {
            model.update(attendance);
            view.renderCountMissing();
        }
    };

    var view = {
        init: function () {
            this.$allMissed = $('tbody .missed-col');
            this.$allCheckboxes = $('tbody input');

            this.$allCheckboxes.on('click', function () {
                var studentRows = $('tbody .student'),
                    newAttendance = {};

                studentRows.each(function () {
                    var name = $(this).children('.name-col').text(),
                        $rowCheckboxes = $(this).children('td').children('input');

                    newAttendance[name] = [];

                    $rowCheckboxes.each(function () {
                        newAttendance[name].push($(this).prop('checked'));
                    });
                });

                octopus.updateAttendance(newAttendance);
            });

            this.renderAttendance();
            this.renderCountMissing();
        },

        renderAttendance: function () {
            var attendance = octopus.getAttendance();

            // Check boxes, based on attendace records
            $.each(attendance, function (name, days) {
                var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
                    dayChecks = $(studentRow).children('.attend-col').children('input');

                dayChecks.each(function (i) {
                    $(this).prop('checked', days[i]);
                });
            });
        },

        renderCountMissing: function () {
            this.$allMissed.each(function () {
                var studentRow = $(this).parent('tr'),
                    dayChecks = $(studentRow).children('td').children('input'),
                    numMissed = 0;

                dayChecks.each(function () {
                    if (!$(this).prop('checked')) {
                        numMissed++;
                    }
                });

                $(this).text(numMissed);
            });
        }
    };

    octopus.init();
}());
