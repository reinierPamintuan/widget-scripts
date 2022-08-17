function createWidget() {
    let widget = new ListWidget();
    widget.backgroundColor = Color.black();
    widget.addText('hellow');
    widget.addSpacer();
    return widget;
}

let mainWidget = createWidget();
Script.setWidget(mainWidget);
mainWidget.presentLarge();
Script.complete();