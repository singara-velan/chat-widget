(function ($) {

    $.fn.chatwidget = function (options) {

        var mountEl, chatbubbleContainerEl, chatWindowContainerEl, clearEl, chatSectionContainerEl,
            chatWelcomeContainerEl, chatHS, chatSvg, welcomeMsg;

        mountEl = this;

        if (mountEl.length == 0) {
            console.log("root element not found to bootstrap");
            return;
        }

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            username: 'Help desk',
            designation: 'bot',
            avatarImgSource: 'data:image/png;base64,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',
            uId: 'chatFi',
            debug: true,
            welcomeMessage: ' Hello, Talk to us. We are here to help you! ',
            sessionTimeout: 30 //mins,
        }, options);

        chatSvg = '<div class="section"><svg class="chat-interfaceIconFillColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M0 0h24v24H0V0z" fill="none"></path>' +
            '<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"></path>' +
            '</svg></div>'

        settings.chatSvg = chatSvg;
        //settings.uId += '-' + new Date().getTime();

        createDom();

        function createDom() {
            chatbubbleContainerEl = createChatBubble();
            chatWelcomeContainerEl = createChatWelcome();
            chatWindowContainerEl = createChatWindow();


            mountEl.append(chatbubbleContainerEl, chatWelcomeContainerEl, chatWindowContainerEl);
        }

        function createChatBubble() {
            var chatBubbleEl = _createElement('div');
            chatBubbleEl.attr({
                id: 'chatbubble',
                class: 'chat-bubble-container chat-bg online active'
            })
            chatBubbleEl.on('click', function () {
                toggleChat();
                hidePrompt();
            });
            chatBubbleEl.append(chatSvg);
            return chatBubbleEl;
        }

        function createChatWelcome() {
            var welcomeEl = _createElement('article');
            welcomeEl.attr({
                id: 'chatWelcomeContainer',
                class: 'chat-welcome-container'
            })
            welcomeEl.append(createWelcomeSection());
            return welcomeEl;
        }

        function createWelcomeSection() {
            var section = _createElement('section'),
                close, msg, actionContainer, inputEl, reply;

            // close button
            close = _createElement('div');
            close.attr({
                id: 'wlclose',
                class: 'wlc-close'
            });
            close.on('click', function () {
                hidePrompt();
            });

            // welcome message containter
            welcomeMsg = _createElement('div');
            welcomeMsg.attr({
                class: 'wlcMsg'
            });
            welcomeMsg.html(settings.welcomeMessage);


            //reply action
            actionContainer = _createElement('div');
            actionContainer.attr({
                class: 'reply'
            });
            inputEl = _createElement('input');
            inputEl.attr({
                id: 'welMsg',
                type: 'text',
                placeholder: 'Write Reply'
            })
            inputEl.on('keypress', function (e) {
                if ((e.keyCode || e.which) == 13) {
                    e.preventDefault();
                    sendChat($(this).val());
                    $(this).val("");
                    hidePrompt();
                    toggleChat();
                }
            });

            reply = _createElement('span');
            reply.attr({
                class: 'send'
            });
            reply.on('click', function () {
                sendChat($(inputEl).val());
                $(inputEl).val("");
                hidePrompt();
                toggleChat();
            });

            actionContainer.append(inputEl);
            actionContainer.append(reply);
            section.append(close, welcomeMsg);
            return section;
        }

        function createChatWindow() {
            var windowEl = _createElement('article');
            windowEl.attr({
                id: 'chatwindow',
                class: 'chat-window-container'
            });
            createMessageSection();
            windowEl.append(createHeader(windowEl), createMessageSection(), createFooter());
            return windowEl;
        }

        function createMessageSection() {
            chatSectionContainerEl = _createElement('section');
            chatSectionContainerEl.attr({
                id: 'chatSection'
            });

            return chatSectionContainerEl;
        }

        function createHeader(windowEl) {
            var resize, close, header = _createElement('header');
            var avatarEl = '<img src="' + settings.avatarImgSource + '"/>';

            // avatar 
            var avatarContainerEl = _createElement('div');
            avatarContainerEl.attr('class', 'avatar');
            avatarContainerEl.append(avatarEl);
            var avatarlTitleEl = _createElement('div');
            avatarlTitleEl
                .attr({class: 'u-name'})
                .html(settings.username);
            var avatarDesingationEl = _createElement('div');
            avatarDesingationEl
                .attr({class: 'd-name'})
                .html(settings.designation);

            var actionsContainerEl = _createElement('div');
            actionsContainerEl.attr('class', 'actions');

            
            // resize button
            resize = _createElement('img');
            resize.attr({
                id: 'resize',
                class: 'resize',
                alt: 'full screen img',
                src: 'data:image/png;base64,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'
            })
            resize.on('click', function () {
                $(windowEl).toggleClass('full');
            });

            //close button
            close = _createElement('div');
            close.attr({
                id: 'closeBtn',
                class: 'close'
            });
            close.on('click', function () {
                toggleChat();
            });

            // clear element
            clearEl = $('<div class="clear">');

            actionsContainerEl.append(resize, close);

            header.append(avatarContainerEl, avatarlTitleEl, avatarDesingationEl, actionsContainerEl, clearEl);
            return header;
        }

        function createMessages(data) {
            var msgContainerEl = _createElement('div');
            msgContainerEl.attr('class', 'msg');
            if (data.type === 'in') {
                var msgOutContainerEl = $('<div class="msg-in">');
                msgOutContainerEl.append('<div><span class="tail-container"></span></div>');
                msgOutContainerEl.append(createMessageDataEl(data));
                msgContainerEl.append(msgOutContainerEl);

            } else if (data.type === 'out') {
                var msgOutContainerEl = $('<div class="msg-out">');
                msgOutContainerEl.append('<div><span class="tail-container"></span></div>');
                msgOutContainerEl.append(createMessageDataEl(data));
                msgContainerEl.append(msgOutContainerEl);
            }

            chatSectionContainerEl.append(msgContainerEl);
        }

        function createMessageDataEl(data) {
            var dataEl = '<div class="bubble">' +
                '<div class="msg-text">' + data.msg + '</div>' +
                '<div class="msg-metadata"><span>' + data.timestamp + '</span></div>' +
                '</div>';
            return dataEl;
        }

        function createFooter() {
            var footerEl = $('<footer>'),
                inputEl, reply;
            reply = $(
                "<img src='data:image/png;base64,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" +
                "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" +
                "lXKriC4Drax48zatjn6p+Wd1X/bi6rfr76thGI+CamrKruAI45tyYA3BYb6XX1NxW6yl7b1ttb199fUNj5b6pSfo01W96/uFDfP8LvbFh+sUCKgCOrv0VsFWvNqYFPt5YSfCL1W9XxzYbUwmnKi2hFcAJ4uYdgKvpYlVMm9V7Gk3R5yv57W+g/q7LfP/dDh7Q7P/zAThZLjRWE/xO9c/VD6rzq2Ob7b0+AHACudEHON32B077n9fefiMXs9WokPr47HH+/GONAOvMRbbNN37Li7pUgAXA8TVvzL7V+trw0+oz1dca0wZf7nALeQBwgrj5Bzi5DmqYvr8v1Xy63aW8tzF976Orx2n7yOrxxuqdjQqq6XF6fvaN3+5A8x4l8+vTxZ4DcPxN/RF32vsLjaeqr1e3N5qyP1q9ODtvc3a+yiuAU8BAAOB4uljF1Lxh+mF/O/2ORkA1be9pNEl/7+zx/Qds72sEVJczvZepYfrF3r9rEsDpMK+0Ortv/12Niqu7Go3Zfzs7fmb1OJ0LwClisABw9Oz/bN7/9ZX8tvlso0H6O2bbO1f7bmxUUH10tX1ktn2sEVJdznbroOxi/a+EUwDU+vq1f9r4k9UfGsHVlxp9riZnG9eQ7Q6/ki0AJ5ABBcDxtdHoETL1CdmabTc2ek99or29qf6pdfP0S03tm347fqkpffsfAeCwzlevVD9vrCT4uerp1bHNxrVluhYBgEEHwMIuF/4c5mb97Y0Aagqm5iv7Tfvf0xgATMHW5mzz2Q/AUqbr2rQibdWz1eer/6x+1giyXr8u7w6AY8MgBuDquJoN0z/YmMZ3U+spfh9bbR+pbmiEWNP2jtnzMwd8v4Psn4Z4uWmLAHBY89Vr59W+36u+UN1T/bHRqH1uM03ZAbgIAxSAyzsokJp/PW9Sfjnvqj7Q3mboH5jtu7F1I/XpcXr+9kO+3/l7OShI05MKgKttaqy+297Q6vfVD6o7q/uru9v7y5wzvXHaOgC8gQEMcNodNJVv/vxK+m+cawRU03ZD9e7Z86my6sOr7UOr7SONkOpyNEwH4CiZV0vNG7O/VD1cPdgIr75RPbE6ttEIuHaymiAAV8AgBzhNDuo3dVibjRvus43fFs+f39i6H9XHZs+nflQ3HeL7z1dXOqjaa/9zADhKtqu/Nfpbfb36bKPaanK2cd3dTqUVAG+CgRBwWlzs8+5yN9HvaW+D9E+0dyW/jzem983/DKvzAXCS7V+h9nz14+qfq/+qnk9lFQBXmcEVcBxdridVjRvnC13e1CD9ptk2//rdjamBB21bV/CeLxaU+RwG4KibKqd2Gte+6fr3+0ZT9q9Wv6uea6woOLeRiisArgIDJ+CoudRKftNN8IUO95vdG1r3mfrg7PmHWjdMv2H2ON/OHfL9zqdCXKwCy2ctAMfN1ANyuzFdfupx9Wr13UZvq59Wv6qenJ232bjuacoOwFVlUAUs7aBganqcL7t9OW9rBE8X2z7QCK2mbf71uw/x/acKrt2LvGcN0wE4iabG6lvtvcY9VP2yuqe6rbp3dmxadXCq0gKAq87ACziKthoB1Xw7t3q8oTHt7+Ptnf73sdX24UN8/6mCSzgFAMN0TZx7sXq6EVx9sbq5UYFV66qsKbRSbQXANWVwBiztoCmC0/be1g3Tp2bp84bpU0+qS5kv6T39efv/fADgYFM19KPVl6tPVw+sjs2n8wusAFiUgRywtP/eqJL6b60rqabthkb11ZkDts2DvtlF7O9JBQDsNU0VrHGdrVGh/NXqc9Ud1V+rfySsAuAIMLgDlvbz6h2NSqp3VO9q3TvjcuZTFOafXxd7DgCszXtNzq+9v6y+Ut1ZPdKovpr3stpq3dQdAK4LAz1gaQf9FndaWXDef+NifakAgMObgqed9oZWz1d3NZqy39NYVfDF2fGzq3Pnq+0CwHVjMAgs7fzq8aAeWADA1TH1qZpPwT9f/bF6rBFYfaV1f6saC6ZMoZVqKwCOFANGYGl+iwsAy3qleqm6rfpU9e3qtdWxrdWjlQQBONIEWMDS3BwDwLUxhVCbre/zf1X9W2NFwT82givVVQAcO2cu/xIAAOAImvpbbTdCq+ne/oXq1saKgr+q/rzaN5n/EtsvlgA4FlRgAUtzowwAb968Kftm6ymANZqy/6SxmuD91UOzY5urbToXAI4VARawNAEWAFy5KbiaTw+serIRVN1ffbPR52paMOXM6vVTU3bXYACOLQEWsDQ3zwBweLu98Z79tepv1SPVl6pPN4KsWldlTZVWrrsAnAgCLGBpbqQB4PCm6+Z03/5M9Y3qk9UPqtf3vQ4ATiQBFrA0N9gAcHHzyqmzs/0/qj7fCK2eqJ5vTA2cTPf1rrMAnEgCLGBpbqwBYK/d1n2qzs32P9GotvpJ9YvqgeqV2fGt1bnTBgAnlgALWJobbABYN2XfbTRbn7zWCKvur+6uvlX9YXZ8qsqaAi8AOBUEWMDSBFgAnGb7e1pN+55pVFz9uPpidfvsuNAKgFNPgAUsTYAFAMN2daExRfBT1S3V06tjG6vN9EAASIAFLM9NOACnzdSYfaPRt6rq2erTjcbsD1UvVeevy7sDgGNAgAUsTYAFwEk39bfabtxvz6cAfq/6WnVv9dvGtMGJqisAuAgBFrA0N+QAnFQHVVpVPdwIrO5ebXe2vh5url47nes6CQAHEGABS3NjDsBJMlVLTdVTk79Vj1e/aVRc3Vo9vzq21Vh5cHu1uTYCwGUIsICluUkH4KTaqf7RmBZ4a/Wv1S9Xx6aqrGl6oeshAFwBARawNDfsABx3u7Ntmir4WnV79cnqm9WLjabsrnsAcBUIsICluZEH4DjamW1nW99H/6a6uRFePVb9uRFmTabXuf4BwFsgwAKW5gYegONit3WPqrOz/X+vbqvuajRn/2n1l9nxM5kqCABXlQALWJobeQCOuil42tq3/+FGxdU9jR5X98+OTQHX9up8AOAqEmABSxNgAXBUTasJzr1U/bVRbfXF6kuN3lY1Kq02EloBwDUnwAKWJsAC4KjaH2D9pvp0I7j6TetrmGsZACxMgAUszU0/AEfFVDm10aimqnq90ZT9c9XPG72tXtx33kauZwCwKAEWsDQ3/ABcTzuN4Kr2Nma/v/pWdWf1q+qhfedttW7MDgAsTIAFLE2ABcDS5sHTvDH7040qq/uqO6rbGz2vatwnn20deLl+AcB1JMAClmYAAMBSpmvO/J731UZw9Xj1tUZ/q8dWxzYbUwmFVgBwxAiwgKUZDABwPVxorCb43er/q77f6HdVI7jazTUKAI4sARawNIMDAK6VaargTmOq4OZq/33VZ6pbGtVXLzcCLQDgmBBgAUsTYAFwNe22Xk3wTOvQ6pnGFMHbqgcb0wTnqwluzs53bQKAI06ABSzNIAGAt2peaXWmvfe0d1b3Vnc3GrM/Njt2ZvU4nQsAHBMCLGBpAiwA3qypWmpz3/4nG03Z76u+VH1nduxs4553e7UBAMeQAAtYmgALgKvhfPWP6ueN0Opz1VOrY1uN+1yVVgBwQgiwgKUJsAC4EvMeVVPl1XPV51fbvdVrrVcUBABOIAEWsDQBFgCXs9N6ut/Z2f7bq/+s7qn+2LriarKZpuwAcCIJsIClGVQAcJBput9ue0Orx6vvN5qz398Iry7Mjp9p3dTdNQYATigBFrA0gwsAJruzbWu2/6XqoerB6kfVf1V/mh0/1zrw0uMKAE4BARawNAEWANO1YH4vulP9tXq2+kb12eru2fGzq/O2cy0BgFNHgAUszaADgP3OVz+p/rn6eqNJ+27jXtV1AwDozPV+AwAAnHhTj6rtxlTBabrgH6ovVF+ufls9X72y71whFgCgAgtYnEEIwOlwsdDqteo7jcbsP61+Uz0xO2+zcY+qKTsA8D8IsIClGYwAnGxTY/XN1TZ5uPp5YxXB71X3zo6dadyXTv2tXCsAgD0EWMDSDEoATqaDGrO/WD1dPVB9sbq59RTBM42AazvVVgDAZQiwgKUZoACcbDvVhUZPq69Wn6x+uTq20bqnlesBAHBoAixgaQYsACfDNFWw1gsDbTdCq89WP65eqP6Rz34A4C0SYAFLM4gBOL6mpuy71bnZ/gerL1V3Nnpd/Xb1uslW66buAABXTIAFLE2ABXC87LYOrc7O9r/QCKzuaqwm+MPVvsnZfecCALxpAixgaQYxAMfD1KdqvpLg69Xj1WPVj6qvtO5vVaMqawqtVFsBAFeNAAtYmgAL4Pj5R/VSdXv1qerb1aurY2daTw/0GQ8AXBMCLGBpBjcAR9cUQm22vk/8TfWvjR5Xf6jOp7oKAFjYmcu/BACAE2qqnNpuhFbTveGL1a2NKYIPVE+0t7/V/JegfjEBAFxzKrCApRnoAFx/U4+qzcYKgZO7qx83GrP/vFF9NdlcbTupwAIAFibAApYmwAK4PqZqq432NmZ/onqoEVh9q/puY5pgjXBrq3Xg5TMcALguBFjA0gx+AJa12xvv+c5Xz1e/rb5cfbr68+rYVJU1VVr53AYArjsBFrA0AyGA6+uZ6pvVv1c/qF5f7ff5DAAcWZq4AwCcLPPKqTOtf2F5R/W56vbqyeqv1YXZedPrBFkAwJGjAgtYmoERwNW327pP1bnZ/qeqrzXCq19Uv6r+MTu+tTp32gAAjiQBFrA0AySAq2Nqyj5VWk3ONxqy31fdW32n+v3s+NnV4xR4AQAceQIsYGkCLIC3Zvoc3di375nGioJ3VDdXt82OC60AgGNNgAUsTYAFcPVsNyqu7qk+Wd3SmDZYYzXBMj0QADgBBFjA0gyiAK7c1Jh9o9G3qurZ6rONxuy/rl5uhFkAACeOAAtYmgAL4PKm/lbbjfu1aQrgTvW9RqXVvdXvGtMG5zZTdQUAnDACLGBpBlQAF3dQpVXVI9Xdq+3e6s7Wvaw2V6+dzvU5CwCcOAIsYGkGVgB7zaulNmf7X2xUWD1Ufb26tXpudWyrsfLg9mrz2QoAnGgCLGBpBlkAF7dT/b0xLfAb1b9V98+On2k9vdDnKQBwagiwgKUZcAGsq652W08VPF/dXv1H9c3qb9Xr+dwEABBgAYszEANOq53Zdrb1fdhD1c3VbdVj1ZPVq7Pzptf5/AQATi0BFrA0AzDgNNlt3aPq7Gz/K9V3q59UP63uq56dHTdVEABgRoAFLM1ADDgNpuBpa9/+h6tfN1YS/HojuJpMAdd26xUGAQBIgAUsT4AFnGS7vfH+6qXG6oH3NqYK3ly9tjp2ZvV6oRUAwCUIsIClCbCA02AKsh6qPl19sfrVbL/PQgCAKyDAApZm0AacJPPKqWkK4OvVl6vPVvc3elu9tO88IRYAwBUQYAFLM2ADjrudRnBVexuz/7z6ZqMx+68b1VdzW60bswMAcAUEWMDSBFjAcTQPnuaN2Z9uBFf3NYKr26sXV8c2GgHXFHj5/AMAeJMEWMDSDOCA42T6zJrfM71WPVU93lhJ8ObqkdnrhFYAAFeZAAtYmsEccFy9Xr1Q3Vb9S/W96vzq2ObqcTefcwAAV50AC1iagR1wlE1TBXcaUwWnYOr+xmqCX21UX/29unAd3h8AwKkkwAKWJsACjprd1qsJnmkdWj1b3dqotPpl9bvqb7PzVF0BACxEgAUszSAPOArmlVZn2ntPdFd192q7s3p0duzM6nE6FwCABQiwgKUJsIDraaqW2mjvfdCT1e+rn1Vfqb41OzZVZU1VWj7HAAAWJsAClmbgBxwV56t/NKYH3lx9rhFk1eh/tdE6sPLZBQBwHQmwgKUZBAJLmwdQU9+qv1RfqD5f3VO9mqbsAABHlgALWJoAC1jCTmPK3251brb/B43Q6q7qT40VBec2U3EFAHDkCLCApRkUAtfK1Fh9tzo72/+HxkqCP6l+Uf20MX1wcqZ1U3efUQAAR5AAC1iawSFwNe3Otq3Z/per31QPVj+q/qtRcTU51zrwspogAMARJ8AClibAAq6G6bNkY9++56tnGqsIfq5RdTU5u3rNdj6LAACOFQEWsDSDRuBq221MCbyr+pfq1kaT9hr3Oj53AACOOQEWsDQDSeDNmHpUbTemCk7TBf9Y/Wf15eqx6q/VK/vOFWIBABxzAixgaQaRwGFdLLQ6X32nur26t3qoemJ23mbjHkdTdgCAE0KABSzNYBK4nKmx+uZqmzxc3d8IrW6v7pkdO9O4r5n6W/msAQA4QQRYwNIMKoGLOagx+0uN6qoHq69UX6j+sTo2VWVtp9oKAOBEE2ABSzPABC5np3q9+l11S/XJ6herYxute1r5PAEAOCUEWMDSDDiBydTjarcxBbBGNdUt1WerH1UvNCqufHYAAJxiAixgaQahcLpNTdl3q3Oz/b+ubq5+XD1S/b66MDu+OTsfAIBTRoAFLE2ABafPVGm1U52d7X+hunO13dcIr56fHT+7OncKvAAAOKUEWMDSDELh9Jj6VM1XEny9erx6rDFF8Kut+1vVqMqaQivVVgAAVAIsYHkCLDid/lG9WH2/+kz1reqV1bF5/yufEQAAvIEAC1iawSmcbFPV1bRaYNVD1b9XX2hUX72e6ioAAK6AAAtYmgALTpapv9V2Y6rgVE31UnVr9eXql9VT1V/3nTvdh/hcAADgkgRYwNIMVOFkmHpUbbQOrarubvS2uqvR2+o3s2Obq21q6A4AAIciwAKWJsCC42uqttpob2P2J6tfNwKrb1e3Va+ujm2ttinw8hkAAMAVE2ABSzN4heNn6mk1d756rrGa4C2Nxux/XB2bqrKmSis/9wAAvCUCLGBpBrJw/D1bfbPRmP32RlP2jfx8AwBwjQiwgKUZ4MLRN6+cOtP6fuGO6vPV96onqheqC7PzNGUHAOCaEGABSzOwhaNpt3WfqnOz/U9XX2s0Zp+asv99dnxrde60AQDAVSfAApZmgAtHx9SUfaq0mpyv7q9+Vt1bfbf63ez42dXjFHgBAMA1JcAClibAgutv+jncfx/wdPXnxlTBLzVWE5wIrQAAuG4EWMDSBFhwtFxoNGG/t/p09ZXqydUx0wMBADgSBFjA0gyC4fqYGrNvNIKpqr9Un11tv65ebkwfBACAI0WABSxNgAXLmPpbbTeu92dn+2+rbqnurn7fuuJqspmqKwAAjhABFrA0A2K4tqZKq9rbmP3R6s5GaHXv6nF7dWxj9drpXD+nAAAcKQIsYGkGxnD1TdVSG+29tr9Y/bZ6qPpmdWv17OrYZqMqa3u1+dkEAODIEmABSzNIhmtrp9HL6snqv6p/re6fHT/Tenqhn0cAAI4FARawNANmuDrmPaqmyqvz1ferT1Zfr/7WWGXQzx0AAMeaAAtYmoE0vHm7jel+O43pf9N1/JHqi9V3G72unqpenZ23MTsfAACOHQEWsDQDaLgy89Dq3Gz/q43A6sfVfdXPqmdmx7dWj6YKAgBw7AmwgKUZSMPhTMHT1r79D1e/bqwk+I3qp7NjZ1ePU+AFAAAnggALWJoACy5tWk1w7qXqueqe6kurbZoieGb1eqEVAAAnlgALWJoACw5n+ll5uPps9YXqgdW+jfwsAQBwigiwgKUZdMNeO43qqVpPAbxQfbn6TKO/1XONKqw5IRYAAKeGAAtYmgE3HBxaVf2i+q/qjuo31UP7zttq/AyZKggAwKkiwAKWJsDitJqCp91G36rJM40VBO+r7qy+X/1tdvxc68DLzw8AAKeSAAtYmgE4p830b35+zX2terJ6vFFxdXOj19X0urMJrQAA4H8QYAFLMxjnNDtfvdCosvqX6rurfVWbq8fd/JwAAMAeAixgaQbmnHTzqYKbrYOp+xurCX6peqr6R6NZOwAAcBkCLGBpAixOot3GdL+dRn+rKbR6rrql+k71QPX79va32mi9mqCfDQAAuAgBFrA0g3ROiqnSaqexOuDm7Nhdq+2eRmP2R2fHthrX3+lcAADgMgRYwNIEWBx3U7XUVD01ebr6bWM1wVsbzdknU1XWVKXl5wAAAK6AAAtYmoE7J8n56uXqweorjR5Xf14dm/pfTYGVf/sAAPAmCbCApRnEcxzNA6ip8ur56ovVZxpTBV9tVFj5Nw4AAFeZAAtYmsE9x8VO60Dq3Gz/DxuVVnc1qq2e2nfedG31bx0AAK4SARawNIN6jrKd2TYPrf5U3Vb9qLGa4E8b0wcnZ1o3dfdvHAAArjIBFrA0g3uOmt3ZtjXb/3L160Z/qzuqb1Z/mB0/197ACwAAuEYEWMDSBFgcFfOeVvN9z1XPVN+uPt8IryZnW1daCa0AAGAhAixgaQIsjqKd6vVGM/Z/rm6p/rI6tpF/twAAcF0JsIClCQK4XuaVU5utpwv+qfpCdXP1aPVC9cq+c4VYAABwHQmwgKUJAVjSFFptNwKrKbS60JgieFt1b/Vw9cTsvM3GNVJTdgAAOAIEWMDShAEsYV5ptTnb/3B1X2MVwR9Ud8+OnWlcF7dbN3UHAACOAAEWsDShANfSQY3ZX2pUVz1QfbX6YvX31bGpKms71VYAAHBkCbCApQkIWMJOdb76XfW16lPV/atjG42qrGl6IQAAcMQJsIClCbC4mqYQarcxBbDV17dWn65+2GjK/mrCKgAAOLYEWMDSBFi8VVNT9t3q3Gz/bxrTA3/c6HX1eKNZ+2SquvJvEAAAjhkBFrA04QFvxm7r0OrsbP/fqp+stp9Vd1TPzY5PVVnTuQAAwDEkwAKWJkTgsHZnj/OVBC80els91qi2urV1f6saVVlT4GXaIAAAnAACLGBpAizerL9XL1Y/avS3+mb1yuqYSisAADjBBFjA0oQLXM7Up2qj9XXq4erfqi9Uv29UYamuAgCAU0KABSxNgMV+00qC242pglM11UvV16ovVT+vnmr0vJrbmH0PAADghBJgAUsTNDCZelRttA6tqu6pflDdWT1Y/Xp2bKPaWp2nAgsAAE4JARawNAHW6TZVW220tzH7k9Wvql9U361ua93faqrKmgIv/4YAAOCUEWABSxM+nE7T//f5ded89Vz1aGOq4KerP85ed7b11EL/bgAA4BQTYAFLE0ScbtP//2erb1f/0ai4utC4Jvn3AQAAvMGZy78EAK7YbuvKqbOz/XdVn21MEXyiemH1uukcIRYAAPAGKrCApQknTq4ptNqpzs32P1vdUv2w+mX1UPXy7PjW6txpAwAA2EOABSxNQHGyTE3Zd9pbafV69bPqvure6nvVb2fHp9dOgRcAAMBFCbCApQmwToapWmpz3/6nqj9XP6m+2uhzNRFaAQAAb4oAC1iaAOvkudBYUfC+6lPVV6onV8e2Vo87+X8PAAC8SQIsYGlCjONrmiq40TqYeq7RlP0z1a+qvzfCLAAAgKtGgAUsTYB1vOw0Kqw2Wk8B3K1ub0wRvLN6vHXF1WQzTdkBAICrRIAFLE2gcfRNlVZVZ2b7H2v0trqrMV3wnkaz9hrXkzOzc/1/BgAArhoBFrA0wcbRNK+Wmjdmf7ERXD1Ufav6WvXM7HVnG03Zt/P/FgAAuEYEWMDShBxH3071UmNa4Leqf2tUXE3ONP4/qrQCAAAWIcAClibwOFqmyquN1Xa++lH1741qq781qqt2LvYNAAAArjUBFrA0Adb1tds6kDrTerrgo9UXq2+vnj9dvTo7b2N2PgAAwKIEWMDSBCDLm4dWZ1t/9r9afbdRcXVf9fNGcDXZWj2aKggAAFxXAixgaYKQ5UzB02Z7P+8frh6sflp9s7p3duzs6tG0QQAA4MgQYAFLE2Bde1NPq7kXq+caodWXq5urV1bHzqxev9MIrgAAAI4UARawNAHWcqYKqkerz1Wfrx5Y7dPTCgAAODbOXO83AMBbNq+cmqYAXqi+Wn2q0d/queql2TkHVWkBAAAcSQYvwNJU/FwdU2i1W52b7X+g+nqjMfvD1UP7zttanaO/FQAAcGwIsIClCbDevCl42m1vBe2" +
                "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' />"
            );
            inputEl = $('<input id="inMsg" type="text" placeholder="send message" class="message-type">');
            inputEl.on('keypress', function (e) {
                if ((e.keyCode || e.which) == 13) {
                    e.preventDefault();
                    sendChat($(this).val());
                    $(this).val("");
                }
            });

            reply.on('click', function () {
                sendChat($(inputEl).val());
                $(inputEl).val("");
            })

            footerEl.append(inputEl, reply);
            return footerEl;
        }

        // helper methods

        function _createElement(type) {
            return $('<' + type + '/>');
        }

        // functional events

        function loadChatHistory(uId) {
            var data = localStorage.getItem('sweeChatHS');
            var msgLen;
            if (data) {
                data = JSON.parse(data);
                if (data.chatId == uId) {
                    chatHS = data;
                    msgLen = data.msgs.length - 1;

                    if ((new Date().getTime() - data.msgs[msgLen].createdTime) >= settings.sessionTimeout * 60000) {
                        console.log('session expired. So creating new sesion');
                        initChatHistory(uId);
                    } else {
                        if (data.msgs[msgLen].type === 'in') {
                            showPrompt(data.msgs[msgLen].msg);
                        }

                        data.msgs.forEach(function (val) {
                            createMessages(val);
                        });
                        scrollDown();
                    }
                } else {
                    initChatHistory(uId);
                    console.log("Provided chat id and stored chat session id is mismatching. So started new Session");
                }
            } else {
                initChatHistory(uId);
                console.log('doesn"t having chat history in session. Started new Session.');
            }

        }

        function initChatHistory(uId) {
            var objHS = {
                chatId: uId,
                msgs: []
            }
            var msg = {
                type: 'in',
                msg: settings.welcomeMessage,
                timestamp: 'now',
                createdTime: new Date().getTime()
            }
            objHS.msgs.push(msg);
            localStorage.setItem('sweeChatHS', JSON.stringify(objHS));
            loadChatHistory(uId);
        }

        function updateChatHistory(msg) {
            var objHS = localStorage.getItem('sweeChatHS');
            if (objHS) {
                objHS = JSON.parse(objHS);
                if (objHS.msgs && objHS.msgs.length >= 0) {
                    objHS.msgs.push(msg);
                } else {
                    objHS.msgs = [msg];
                }
                localStorage.setItem('sweeChatHS', JSON.stringify(objHS));
            }
        }

        function sendChat(msg) {
            if (msg && msg.length > 0) {
                var date = new Date();
                var payload = {
                    'type': 'out',
                    'msg': msg,
                    'timestamp': date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes()
                }
                msgOut(payload);
            }

        }

        function scrollDown() {
            setTimeout(function () {
                $(chatSectionContainerEl).scrollTop(chatSectionContainerEl[0].clientHeight + chatSectionContainerEl[0].scrollHeight);
            }, 100)
        };


        // Dom managing Events

        function toggleChat() {
            $('#chatbubble').toggleClass('active');
            $('#chatwindow').toggleClass('active');
            $('#chatwindow').removeClass('full');
        }

        function showPrompt(data) {
            $('#chatWelcomeContainer').addClass('active');
            $('#chatwindow').removeClass('active');
            if (data) {
                welcomeMsg.html(data);
            }
        }

        function hidePrompt() {
            $('#chatWelcomeContainer').removeClass('active');
        }

        // public methods
        loadChatHistory(settings.uId);

        // public methods

        function msgIn(payload) {
            payload.type = 'in';
            payload.createdTime = new Date().getTime();
            createMessages(payload);
            updateChatHistory(payload);
            scrollDown();
            if (!$('#chatwindow').hasClass('active')) {
                toggleChat();
            }
        }

        function msgOut(payload) {
            payload.type = 'out';
            payload.createdTime = new Date().getTime();
            createMessages(payload);
            updateChatHistory(payload);
            scrollDown();
            if (settings.messageOut && typeof settings.messageOut === "function") {
                settings.messageOut(payload);
            } else {
                window.messageOut = payload;
                console.log(window.messageOut);
            }
        }

        $.fn.chatwidget.messageIn = msgIn;

        console.log(mountEl);
    };

}(jQuery));