<!DOCTYPE html>
<html>
<head>

    <title>Instructor</title>
    <link rel="stylesheet" type="text/css" href="http://w2ui.com/src/w2ui-1.4.2.min.css" />
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
    <script type="text/javascript" src="http://w2ui.com/src/w2ui-1.4.2.min.js"></script>
</head>
<body>

<div id="main" style="width: 100%; height: 400px;"></div>
<script type="text/javascript">
var config = {
	layout: {
		name: 'layout',
		padding: 0,
		panels: [
			{ type: 'left', size: 200, resizable: true, minSize: 120 },
			{ type: 'main', overflow: 'hidden', 
				style: 'background-color: white; border: 1px solid silver; border-top: 0px; padding: 10px;',
				tabs: {
					onClick: function (event) 
               {
                  if ( event.target == "view" )
                     w2ui.layout.html('main', w2ui.allPuzzles);
                  else if ( event.target == "create" )
				         w2ui.layout.html('main', w2ui.grid2);
                  else if ( event.target == "assign" )
				         w2ui.layout.html('main', w2ui.grid3);
                  else if ( event.target == "grade" )
				         w2ui.layout.html('main', w2ui.grid4);
					},
					onClose: function (event) {
						this.click('tab0');
					}
				}
			}
		]
	},
    allPuzzles: {
        name: 'allPuzzles',
        url: 'data/list.json',
        show: {
            header: true,
            footer: true
        },
        style: 'padding: 0px',
        columns: [
            { field: 'name', caption: 'Name', size: '33%', sortable: true, searchable: true },
            { field: 'description', caption: 'Description', size: '33%', sortable: true, searchable: true },
        ]
    },
    grid2: {
        name: 'grid2',
        show: {
            header: true,
            footer: true
        },
        style: 'padding: 0px',
        columns: [
            { field: 'fname', caption: 'First Name', size: '33%', sortable: true, searchable: true },
            { field: 'lname', caption: 'Last Name', size: '33%', sortable: true, searchable: true },
            { field: 'email', caption: 'Email', size: '33%' },
            { field: 'sdate', caption: 'Start Date', size: '120px', render: 'date' },
        ],
        records: [
            { recid: 1, fname: 'John', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 5, fname: 'Kelly', lname: 'Silver', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 7, fname: 'Mark', lname: 'Welldo', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 8, fname: 'Thomas', lname: 'Bahh', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 9, fname: 'Sergei', lname: 'Rachmaninov', email: 'jdoe@gmail.com', sdate: '4/3/2012' }
        ]
    },
    grid3: {
        name: 'grid3',
        show: {
            header: true,
            footer: true
        },
        style: 'padding: 0px',
        columns: [
            { field: 'fname', caption: 'First Name', size: '33%', sortable: true, searchable: true },
            { field: 'lname', caption: 'Last Name', size: '33%', sortable: true, searchable: true },
            { field: 'email', caption: 'Email', size: '33%' },
            { field: 'sdate', caption: 'Start Date', size: '120px', render: 'date' },
        ],
        records: [
            { recid: 1, fname: 'John', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 5, fname: 'Kelly', lname: 'Silver', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 7, fname: 'Mark', lname: 'Welldo', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 8, fname: 'Thomas', lname: 'Bahh', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 9, fname: 'Sergei', lname: 'Rachmaninov', email: 'jdoe@gmail.com', sdate: '4/3/2012' }
        ]
    },
    grid4: {
        name: 'grid4',
        show: {
            header: true,
            footer: true
        },
        style: 'padding: 0px',
        columns: [
            { field: 'fname', caption: 'First Name', size: '33%', sortable: true, searchable: true },
            { field: 'lname', caption: 'Last Name', size: '33%', sortable: true, searchable: true },
            { field: 'email', caption: 'Email', size: '33%' },
            { field: 'sdate', caption: 'Start Date', size: '120px', render: 'date' },
        ],
        records: [
            { recid: 1, fname: 'John', lname: 'Doe', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 2, fname: 'Stuart', lname: 'Motzart', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 3, fname: 'Jin', lname: 'Franson', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 4, fname: 'Susan', lname: 'Ottie', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 5, fname: 'Kelly', lname: 'Silver', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 6, fname: 'Francis', lname: 'Gatos', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 7, fname: 'Mark', lname: 'Welldo', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 8, fname: 'Thomas', lname: 'Bahh', email: 'jdoe@gmail.com', sdate: '4/3/2012' },
            { recid: 9, fname: 'Sergei', lname: 'Rachmaninov', email: 'jdoe@gmail.com', sdate: '4/3/2012' }
        ]
    },
	sidebar: {
		name: 'sidebar',
		nodes: [ 
			{ id: 'general', text: 'General', group: true, expanded: true, nodes: [
				{ id: 'view', text: 'View Puzzles', img: 'icon-page' },
				{ id: 'create', text: 'Create Puzzles', img: 'icon-page' },
				{ id: 'assign', text: 'Assign Puzzles', img: 'icon-page' },
				{ id: 'grade', text: 'View Grades', img: 'icon-page' }
			]}
		],
		onClick: function (event) 
      {
			var tabs = w2ui.layout_main_tabs;
			if ( tabs.get(event.target) ) 
         {
				tabs.select( event.target );
            if ( event.target == "view" )
               w2ui.layout.html('main', w2ui.allPuzzles);
            else if ( event.target == "create" )
				   w2ui.layout.html('main', w2ui.grid2);
            else if ( event.target == "assign" )
				   w2ui.layout.html('main', w2ui.grid3);
            else if ( event.target == "grade" )
				   w2ui.layout.html('main', w2ui.grid4);
			} 
         else 
         {
            tabs.add({ id: event.target, caption: event.target, closable: true });
            tabs.select( event.target );
            if ( event.target == "view" )
				   w2ui.layout.html('main', w2ui.allPuzzles);
            else if ( event.target == "create" )
				   w2ui.layout.html('main', w2ui.grid2);
            else if ( event.target == "assign" )
				   w2ui.layout.html('main', w2ui.grid3);
            else if ( event.target == "grade" )
				   w2ui.layout.html('main', w2ui.grid4);
			}
		}
	}
}

$(function () {
	// initialization
	$('#main').w2layout(config.layout);
	$().w2grid(config.allPuzzles);
	$().w2grid(config.grid2);
	$().w2grid(config.grid3);
	$().w2grid(config.grid4);
	w2ui.layout.content('left', $().w2sidebar(config.sidebar));
});

</script>

</body>
</html>
