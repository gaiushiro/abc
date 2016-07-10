<?php
$arr = array('title' => 'All Day Event', 'start'=> '2016-05-11', 'end'=> '2016-05-13');

    $eventsJson = array();
    $eventsJson[] = array(
        'title' => 'All Day Event',
        'start'=> '2016-05-11'
    );
    $eventsJson[] = array(
        'title' => 'All Day Event2',
        'start'=> '2016-05-12'
    );

return json_encode($eventsJson);
?>
