import { FloorPlanEditor } from "./FloorPlanEditor.js";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector(".editor-root");
  const save_btn = document.getElementById("save-changes");
  if (!root) return;
  const floorplan = new FloorPlanEditor(root);

  save_btn.addEventListener("click", () => {
    if(floorplan.state.mode=== 'creator'){
      console.log(floorplan.getFloorLayout())
    //   floorplan.loadFloorplanPolygon(pop_layout())
    }else{
    //   floorplan.loadItems(mock_items())
      console.log(floorplan.getItems())
    }
  });
});

function pop_layout() {
 const layout = [
    {
        "x": 99.125,
        "y": 147.8125
    },
    {
        "x": 582.125,
        "y": 147.8125
    },
    {
        "x": 582.125,
        "y": 342.8125
    },
    {
        "x": 315.125,
        "y": 342.8125
    },
    {
        "x": 315.125,
        "y": 433.8125
    },
    {
        "x": 111.125,
        "y": 433.8125
    },
    {
        "x": 111.125,
        "y": 386.8125
    },
    {
        "x": 34.125,
        "y": 386.8125
    },
    {
        "x": 34.125,
        "y": 147.8125
    }
]

  return layout;
}


function mock_items(){
  return {
    "tables": [
        {
            "id": "9cfe0d63-a2d1-48da-96ba-a004e36ebfa6",
            "type": "table",
            "pos": {
                "x": 249.125,
                "y": 204.8125
            },
            "rotation": 0,
            "data": {
                "capacity": 4,
                "reservable": true,
                "rotation": 0
            }
        },
        {
            "id": "95cdab96-f01a-4548-bfab-6e63206a7c00",
            "type": "table",
            "pos": {
                "x": 316.125,
                "y": 199.8125
            },
            "rotation": 0,
            "data": {
                "capacity": 4,
                "reservable": true,
                "rotation": 0
            }
        },
        {
            "id": "67bc5fa5-da11-4d46-a0cb-fae77b8e1854",
            "type": "table",
            "pos": {
                "x": 383.125,
                "y": 202.8125
            },
            "rotation": 0,
            "data": {
                "capacity": 4,
                "reservable": true,
                "rotation": 0
            }
        },
        {
            "id": "b102b5ca-8d52-4859-adda-c4586261e958",
            "type": "table",
            "pos": {
                "x": 451.125,
                "y": 199.8125
            },
            "rotation": 0,
            "data": {
                "capacity": 4,
                "reservable": true,
                "rotation": 0
            }
        },
        {
            "id": "7a5b9ad5-3014-40b7-9f15-eb96e61d3fed",
            "type": "table",
            "pos": {
                "x": 451.125,
                "y": 294.8125
            },
            "rotation": 0,
            "data": {
                "capacity": 4,
                "reservable": true,
                "rotation": 0
            }
        },
        {
            "id": "069cb630-55db-4aed-ba76-32008f8ecf2a",
            "type": "table",
            "pos": {
                "x": 362.125,
                "y": 296.8125
            },
            "rotation": 0,
            "data": {
                "capacity": 4,
                "reservable": true,
                "rotation": 0
            }
        },
        {
            "id": "ed3c9bbc-2eed-44fa-8434-2287f6d641af",
            "type": "table",
            "pos": {
                "x": 252.125,
                "y": 295.8125
            },
            "rotation": 0,
            "data": {
                "capacity": 4,
                "reservable": true,
                "rotation": 0
            }
        }
    ],
    "misc": [
        {
            "id": "37a7b74a-50ad-493c-99aa-267955868388",
            "type": "window",
            "pos": {
                "x": 34.125,
                "y": 203.8125
            },
            "rotation": -90,
            "data": {
                "length": 50
            },
            "hostSegment": {
                "a": {
                    "x": 34.125,
                    "y": 386.8125
                },
                "b": {
                    "x": 34.125,
                    "y": 147.8125
                },
                "projPoint": {
                    "x": 34.125,
                    "y": 203.8125
                },
                "t": 0.7656903765690377,
                "angleRad": -1.5707963267948966,
                "angleDeg": -90
            }
        },
        {
            "id": "d1d8f369-4fa8-4662-b64c-64603fb7fabe",
            "type": "window",
            "pos": {
                "x": 34.125,
                "y": 342.8125
            },
            "rotation": -90,
            "data": {
                "length": 50
            },
            "hostSegment": {
                "a": {
                    "x": 34.125,
                    "y": 386.8125
                },
                "b": {
                    "x": 34.125,
                    "y": 147.8125
                },
                "projPoint": {
                    "x": 34.125,
                    "y": 342.8125
                },
                "t": 0.18410041841004185,
                "angleRad": -1.5707963267948966,
                "angleDeg": -90
            }
        },
        {
            "id": "4db8fb9c-3f6e-417c-b927-d3b351bb2c08",
            "type": "window",
            "pos": {
                "x": 582.125,
                "y": 195.8125
            },
            "rotation": 90,
            "data": {
                "length": 50
            },
            "hostSegment": {
                "a": {
                    "x": 582.125,
                    "y": 147.8125
                },
                "b": {
                    "x": 582.125,
                    "y": 342.8125
                },
                "projPoint": {
                    "x": 582.125,
                    "y": 195.8125
                },
                "t": 0.24615384615384617,
                "angleRad": 1.5707963267948966,
                "angleDeg": 90
            }
        },
        {
            "id": "4c7017be-f065-404e-8af3-899e796b62d0",
            "type": "window",
            "pos": {
                "x": 582.125,
                "y": 305.8125
            },
            "rotation": 90,
            "data": {
                "length": 50
            },
            "hostSegment": {
                "a": {
                    "x": 582.125,
                    "y": 147.8125
                },
                "b": {
                    "x": 582.125,
                    "y": 342.8125
                },
                "projPoint": {
                    "x": 582.125,
                    "y": 305.8125
                },
                "t": 0.8102564102564103,
                "angleRad": 1.5707963267948966,
                "angleDeg": 90
            }
        },
        {
            "id": "847366a5-e0c1-4da2-8b8b-fc57494d2c92",
            "type": "door",
            "pos": {
                "x": 217.125,
                "y": 433.8125
            },
            "rotation": 180,
            "data": {
                "length": 80
            },
            "hostSegment": {
                "a": {
                    "x": 315.125,
                    "y": 433.8125
                },
                "b": {
                    "x": 111.125,
                    "y": 433.8125
                },
                "projPoint": {
                    "x": 217.125,
                    "y": 433.8125
                },
                "t": 0.4803921568627451,
                "angleRad": 3.141592653589793,
                "angleDeg": 180
            }
        }
    ]
}
}
