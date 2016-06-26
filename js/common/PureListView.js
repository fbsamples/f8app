/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */
'use strict';

var ListView = require('ListView');
var Dimensions = require('Dimensions');
var Platform = require('Platform');
var StyleSheet = require('StyleSheet');
var React = require('React');
var View = require('View');

type Rows = Array<Object>;
type RowsAndSections = {
  [sectionID: string]: Object;
};

export type Data = Rows | RowsAndSections;
type RenderElement = () => ?ReactElement;

type Props = {
  data: Data;
  renderEmptyList?: ?RenderElement;
  minContentHeight: number;
  contentInset: { top: number; bottom: number; };
};

type State = {
  contentHeight: number;
  dataSource: ListView.DataSource;
};

// FIXME: Android has a bug when scrolling ListView the view insertions
// will make it go reverse. Temporary fix - pre-render more rows
const LIST_VIEW_PAGE_SIZE = Platform.OS === 'android' ? 20 : 1;

class PureListView extends React.Component {
  props: Props;
  state: State;

  static defaultProps = {
    data: [],
    contentInset: { top: 0, bottom: 0 },
    // TODO: This has to be scrollview height + fake header
    minContentHeight: Dimensions.get('window').height + 20,
    renderSeparator: (sectionID, rowID) => <View style={styles.separator} key={rowID} />,
  };

  constructor(props: Props) {
    super(props);
    let dataSource = new ListView.DataSource({
      getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
      getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      contentHeight: 0,
      dataSource: cloneWithData(dataSource, props.data),
    };

    (this: any).renderFooter = this.renderFooter.bind(this);
    (this: any).onContentSizeChange = this.onContentSizeChange.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        dataSource: cloneWithData(this.state.dataSource, nextProps.data),
      });
    }
  }

  render() {
    const {contentInset} = this.props;
    const bottom = contentInset.bottom +
      Math.max(0, this.props.minContentHeight - this.state.contentHeight);
    return (
      <ListView
        initialListSize={10}
        pageSize={LIST_VIEW_PAGE_SIZE}
        {...this.props}
        ref="listview"
        dataSource={this.state.dataSource}
        renderFooter={this.renderFooter}
        contentInset={{bottom, top: contentInset.top}}
        onContentSizeChange={this.onContentSizeChange}
      />
    );
  }

  onContentSizeChange(contentWidth: number, contentHeight: number) {
    if (contentHeight !== this.state.contentHeight) {
      this.setState({contentHeight});
    }
  }

  scrollTo(...args: Array<any>) {
    this.refs.listview.scrollTo(...args);
  }

  getScrollResponder(): any {
    return this.refs.listview.getScrollResponder();
  }

  renderFooter(): ?ReactElement {
    if (this.state.dataSource.getRowCount() === 0) {
      return this.props.renderEmptyList && this.props.renderEmptyList();
    }

    return this.props.renderFooter && this.props.renderFooter();
  }
}

function cloneWithData(dataSource: ListView.DataSource, data: ?Data) {
  if (!data) {
    return dataSource.cloneWithRows([]);
  }
  if (Array.isArray(data)) {
    return dataSource.cloneWithRows(data);
  }
  return dataSource.cloneWithRowsAndSections(data);
}

var styles = StyleSheet.create({
  separator: {
    backgroundColor: '#eeeeee',
    height: 1,
  },
});

module.exports = PureListView;
