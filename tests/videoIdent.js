///////////////////////////////////////////////////////////////////////////
// Copyright 2020 Roku, Inc.
//
//Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//You may obtain a copy of the License at
//    http://www.apache.org/licenses/LICENSE-2.0
//
//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.
//////////////////////////////////////////////////////////////////////////

const rokuLibrary = require("../library/rokuLibrary");
const expect = require("chai").expect;

let library;

describe("VideoIdent loading sanity check", () => {
  before(async function () {
    this.timeout(50000);
    library = new rokuLibrary.Library("10.103.126.222");
    await library.sideLoad("./channels/roku-deploy.zip", "rokudev", "password");
  });

  it("launchies", async function () {
    this.timeout(5000);
    await library.verifyIsChannelLoaded("dev");
  });

  it("loads VideoIdent element", async function () {
    this.timeout(10000);
    let res = await library.verifyIsScreenLoaded(
      { elementData: [{ using: "tag", value: "VolleyVideoIdent" }] },
      2,
      2
    );
    expect(res).to.equal(true);
  });

  it("doesn't load BideoIdent element", async function () {
    this.timeout(10000);
    let res = await library.verifyIsScreenLoaded(
      { elementData: [{ using: "tag", value: "BolleyBideoIdent" }] },
      2,
      2
    );
    expect(res).to.equal(false);
  });

  after(async () => {
    await library.close();
  });
});
