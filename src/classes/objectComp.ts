export class ObjectComp{
    private id: any;
    private url:any;
    private top:any;
    private left:any;
    private component:any;

    constructor(id:any, url:any,top:any,left:any, ){
        this.id =id;
        this.url =url;
        this.top =top;
        this.left =left;
        this.component= [];
    }

    public get getId(): any {
        return this.id;
    }

    public set setId(value: any) {
        this.id = value;
    }

    public get getUrl(): any {
        return this.url;
    }

    public set setUrl(value: any) {
        this.url = value;
    }

    public get getTop(): any {
        return this.top;
    }

    public set setTop(value: any) {
        this.top = value;
    }

    public get getLeft(): any {
        return this.left;
    }

    public set setLeft(value: any) {
        this.left = value;
    }

    public get getComponents() {
        return this.component;
    }



    
}