import React from "react";
import "./App.css";

// import vanillaJS Potree libs, /!\ would be best with proper ES6 import
const Potree = window.Potree;

export default class PointcloudNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.potreeContainerDiv = React.createRef();
  }

  componentDidMount() {
    // initialize Potree viewer
    const viewerElem = this.potreeContainerDiv.current;
    this.viewer = new Potree.Viewer(viewerElem);
    this.viewer.setEDLEnabled(true);
    this.viewer.setFOV(60);
    this.viewer.setPointBudget(1 * 1000 * 1000);
    this.viewer.setClipTask(Potree.ClipTask.SHOW_INSIDE);
    this.viewer.loadSettingsFromURL();
    this.viewer.setControls(this.viewer.earthControls);

    // Load and add point cloud to scene
    let url = "https://raw.githubusercontent.com/potree/potree/develop/pointclouds/lion_takanawa/cloud.js";
    Potree.loadPointCloud(url).then(
      (e) => {
        let scene = this.viewer.scene;
        let pointcloud = e.pointcloud;
        let material = pointcloud.material;
        material.activeAttributeName = "rgba";
        material.minSize = 2;
        material.pointSizeType = Potree.PointSizeType.FIXED;
        this.viewer.scene.addPointCloud(pointcloud);
        this.viewer.fitToScreen();
      },
      (e) => console.err("ERROR: ", e)
    );
  }

  componentDidUpdate() {
    // If you want to update Potree View/other element upon render(), put it here
  }

  render() {
    return (
      <div ref={this.potreeContainerDiv} className="potree-container">
        <div
          id="potree_render_area"
          style={{ backgroundImage: "url('../build/potree/resources/images/background.jpg')" }}
        />
        <div id="potree_sidebar_container" />
      </div>
    );
  }
}
