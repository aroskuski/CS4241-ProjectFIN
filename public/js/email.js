/**
 * Created by Zack on 12/16/2014.
 */

//sends the username and email to the database
$(document).ready(function(req, res) {
    $('#subEmail').submit(function (evt) {

        // get all the inputs into an array.
        var $inputs = $('#subEmail :input');

        // not sure if you wanted this, but I thought I'd add it.
        // get an associative array of just the values.
        var values = {};
        $inputs.each(function () {
            values[this.name] = $(this).val();
            console.log(values[this.name]);
            console.log($inputs)
        });

        evt.preventDefault();
        $.ajax({
            url: "https://mandrillapp.com/api/1.0/messages/send.json"
            , type: 'POST'
            , cache: false
            , data: {
                'key': 'WV9fMN1BxKmpwW2kqNGP_Q',
                'message': {
                    'from_email': 'zngoddard@wpi.edu',
                    'to': [
                        {
                            'email': values['parentEmail'],
                            'type': 'to'
                        }
                    ],
                    'autotext': 'true',
                    'subject': 'Christmas Wishlist!',
                    'html': $("#emailText").text()
                }
            }
        });
    });
});

//$(function () {
//    $.ajax({
//        type: “POST”,
//        url: “https://mandrillapp.com/api/1.0/messages/send.json”,
//        data: {
//        ‘key’:WV9fMN1BxKmpwW2kqNGP_Q,
//        ‘message’: {
//            ‘from_email’: ‘YOUR@EMAIL.HERE’,
//            ‘to’:[
//                    {
//                    ‘email’: ‘RECIPIENT_NO_1@EMAIL.HERE’,
//            ‘name’: ‘RECIPIENT
//                NAME(OPTIONAL)’,
//            ‘type’: ‘to’
//            },
//            {
//            ‘email’: ‘RECIPIENT_NO_2@EMAIL.HERE’,
//            ‘name’: ‘ANOTHERRECIPIENTNAME(OPTIONAL)’,
//            ‘type’: ‘to’
//            }
//        ],
//        ‘autotext’: ‘true’,
//        ‘subject’: ‘YOURSUBJECTHERE!’,
//        ‘html’: ‘YOUREMAILCONTENTHERE!YOUCANUSEHTML!’
//        }
//        }
//    }).done(function (response) {
//    console.log(response); // if you're into that sorta thing
//    });
//});

