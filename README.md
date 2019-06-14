# Virtual Facility Coding Challenge

## The Goal

This challenge tests you on having a fully functional app that is deployed somewhere and/or published code in github, and you are comfortable with routing, authorization, feature modules, architecture, style guide.

## The Stack
suggested STACK is Angular, Nodejs, Firebase(auth/hosting)

## The Process

1. Fork this GitHub repo
1. In your forked repo, set up a new Cypress environment
1. Write some end-to-end tests fulfilling the [Assignment Description](#assignment-description) below
1. Create a pull request from your fork into this original repository.
1. In your pull request description, please document how to run the code you've written and how to verify the fulfillment of the acceptance criteria. Feel free to add additional thoughts, e.g. why you implemented a feature in a certain way, what were your learnings, etc.
1. Mention @c-gray, @faisalnwz or @miltonlopezjr in the pull request description to let us know you're ready for review.


## What you'll need
You can use Google, your Github profile, peek into your older projects or use any code sharing websites you find relevant.

You can use BLOB example below. ~500 words.


## Assignment Description
     Develop a Backend + Front-end solution that allows your user to annotate a blob of text.  
     
    The user wants to be able to select a substring of the text document and persist the selection to the server.
    
    You will notice that the substring users wants to edit is in Template literal.
    
    Have a SIMPLE auth system with the ability to login/logout/change password.

    KEEP IT SIMPLE!
    Try to ship as few bugs as possible.
    Focus on a simple design interface. Functionality takes priority over design.

Task 1
    Allow the user to supply a text blob of ~500 words.

    Be able to supply defaults for substrings.

    Be able to view text blob and edit substrings.

    The text blob is persisted to server and displayed on the page when the page is reloaded, loaded in a different browser.

 Task 2
    All data is persisted on the server. When the user logs back in the user should be able to view and edit the stored blobs.

Task 3
    The user may wish to assign the blobs into categories/tags.

    This is open-ended task you can design/implement it any way you see fit.
    
    Done!


TEXT_BLOB_EXAMPLE
`Lorem ipsum dolor sit amet, ${FIRST_EDITABLE_FIELD} adipiscing elit. Aenean dictum elementum purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse potenti. Ut porta venenatis velit, ac scelerisque nisi lobortis eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In pellentesque elementum dolor vel aliquam. Integer maximus mattis nisi non efficitur. Nam elementum venenatis nibh sed feugiat. Aliquam a diam sed nulla lobortis sollicitudin ac vel lorem.

Duis eu dui id sem dapibus sodales egestas et arcu. Aenean convallis nunc eu risus bibendum efficitur. Aenean congue sapien a tortor aliquam rhoncus. Nulla blandit suscipit justo, ac tincidunt mauris pharetra in. Phasellus congue congue convallis. Nullam feugiat nisl vel gravida rutrum. Vestibulum id quam gravida, gravida mauris id, bibendum nulla. Fusce vitae felis malesuada, mattis sem a, mattis risus.

Aenean mollis, leo et consectetur tincidunt, ${FOURTH_EDITABLE_FIELD} neque porttitor sapien, luctus auctor magna mi vel ante. ${THIRD_EDITABLE_FIELD} suscipit tortor sed leo tincidunt egestas. Integer eu dui dapibus, lacinia purus quis, tempor sem. Morbi in malesuada justo. Morbi et neque tincidunt, consectetur lacus nec, ornare velit. Ut sit amet laoreet massa. Sed a erat risus. Aenean vulputate diam augue, non egestas velit tristique id. Suspendisse potenti.

Praesent sollicitudin, quam nec tempor molestie, elit ${SECOND_EDITABLE_FIELD} vehicula quam, fringilla fermentum massa nulla eu elit. Nullam nec egestas arcu, ac maximus odio. Integer ac vulputate libero. In ac dui eget felis laoreet placerat. Morbi dapibus turpis at enim ultricies, eget venenatis risus elementum. Cras molestie arcu eget magna tristique, nec tristique tellus venenatis. Praesent at scelerisque velit. Cras nec est magna. Vivamus vitae porta dolor. Vivamus felis dui, tincidunt ac nisl non, suscipit luctus metus.

Nullam viverra ante nunc, eget ullamcorper lacus fringilla vel. Nam non dui ex. Vivamus nunc lacus, mollis eget lectus in, finibus molestie tellus. Etiam interdum libero enim, pretium laoreet mauris volutpat vel. Ut ornare ultrices velit, a rutrum odio blandit non. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla pharetra odio ut nulla aliquam sagittis. Quisque nisl orci, fringilla et tellus ut, ornare vehicula nulla. Quisque condimentum et massa ut aliquam. Integer vestibulum tellus sed dui vehicula, 

eu elementum elit varius. Aenean libero dolor, vulputate quis ${FIFTH_EDITABLE_FIELD} vitae, laoreet sit amet felis. Pellentesque sit amet laoreet sem, sit amet scelerisque arcu. Praesent pulvinar mauris a finibus porttitor. Aenean sodales convallis mi, quis tincidunt ante consequat.`
