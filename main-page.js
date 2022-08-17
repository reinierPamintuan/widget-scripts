function createWidget() {
    let widget = new ListWidget();
    const files = FileManager.iCloud();
    const fileName = "/Transparent_back2.JPG";
    //const path = files.joinPath(files.documentsDirectory(),fileName)
    const path = files.documentsDirectory();


    const cloudFileName = "/.Transparent_back2.JPG.icloud";
    if(!files.isFileDownloaded(path+cloudFileName)){
        files.downloadFileFromiCloud(path+cloudFileName);
    }
    
    
    
    widget.backgroundImage = files.readImage(path+fileName);
    widget.addText(path);
    widget.addSpacer();
    console.log(files.listContents(path));
    return widget;
}


//IMG_6566

let mainWidget = createWidget();
Script.setWidget(mainWidget);
mainWidget.presentLarge();
Script.complete();