import { customElement, bindable, inject } from 'aurelia-framework';

import $ from 'jquery';
import 'jquery-ui/ui/widgets/selectmenu';

@customElement('jquery-ui-select')
@inject(Element)
export class JquerySelect {
    @bindable id = '';
    @bindable name = '';
    @bindable selected = false;
    @bindable options = {};

    constructor(Element) {
        this.element = Element;

        if (!this.id && this.name) {
            this.id = this.name;
        }

        if (!this.name && this.id) {
            this.name = this.id;
        }
    }

    attached() {
        $('#myCustomSelect').selectmenu(this.options)
            .on('change', e => {
                let changeEvent = new CustomEvent('input', {
                    detail: {
                        value: e.val
                    },
                    bubbles: true
                });

                this.element.dispatchEvent(changeEvent);
            });
    }

    detached() {
        $(`#${this.id}`).selectmenu('destroy').off('change');
    }
}
