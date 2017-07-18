import Matter from 'matter-js'

// module aliases
    var Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Events = Matter.Events,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Body = Matter.Body;

    var root = document.getElementById('root');
    var width = window.getComputedStyle(root).width;
    var height = window.getComputedStyle(root).height;

    var engine = Engine.create({
       element: document.body,
       options: {
         width: parseInt(width),
         height: parseInt(height)
     }
   });

    // create two boxes and a ground
    var ball = Bodies.circle(420, 15, 20);

    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    // Add Mouse Controls
    var mouse = Mouse.create();
    var mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                      visible: false
                  }
            }
        });

    // Add event handler for mouse events
    /* NOTE: Using startdrag and enddrag so we can have a reference to the body
       in the physics model that is being click by the mouse.*/
    Events.on(mouseConstraint, 'startdrag', mouseDown);
    Events.on(mouseConstraint, 'enddrag', mouseUp);

    function mouseDown() {
      console.log('mouse down');
    }

    function mouseUp() {
      console.log('mouse up');
    }

    // create a renderer
    var render = Render.create({
        element: document.getElementById('root'),
        engine: engine
    });

    World.add(engine.world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    var canvas = document.getElementsByTagName('canvas')
    console.log(canvas[0]);
    canvas[0].setAttribute('style','width:100%;height:100vh;object-fit:contain;')

    // fit the render viewport to the scene
    // Render.lookAt(render, {
    //     min: { x: 0, y: 0 },
    //     max: { x: width, y: height }
    // });

    // add all of the bodies to the world
    World.add(engine.world, [ball, boxA, boxB, ground]);

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);
