import { CText } from '../@shared/models/text.model';
import { Type } from 'class-transformer';

export class CPData {
    private layout: string;
    text: string;
    @Type(() => Feed)
    private feed: Feed[];

    constructor() {
        this.text = 'DailyObjects';
        this.layout = '';
        this.feed = [];
    }

    update(value) {
        this.text = value.text;
        this.layout = value.layout;
        this.feed = value.feed;
    }

    isHeaderVisible() {
        if (this.text === '') return false;
        else return true;
    }

    areTabsVisible() {
        if (this.feed.length === 1) return false;
        else return true;
    }

    getTabs(): Array<{ text: string; link: string; active: boolean }> {
        let x = [];
        if (!this.areTabsVisible()) return x;

        for (let i of this.feed) {
            x.push({
                text: i.text,
                link: i.link,
            });
        }
        return x;
    }

    getItems(): Array<Item> {
        for (let i of this.feed) {
            if (i.active === true) return i.items;
        }
    }
}

export class Feed {
    link: string;
    active: boolean;
    text: string;
    @Type(() => Item)
    items: Item[];
}

export class Item {
    link: string;
    image: string;
    @Type(() => CText)
    title: CText;
    @Type(() => CText)
    subtitle?: CText;
}
