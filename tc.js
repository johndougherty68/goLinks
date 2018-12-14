import { Selector } from 'testcafe'; // first import testcafe selectors

fixture `Getting Started`// declare the fixture
    .page `http://localhost/admin`;  // specify the start page


//then create a test and place your code there
test('AddAndDelete', async t => {
    var goLink='tctest';
    await t
        .click('#btnAddNew')
        .typeText('#newGoLink', goLink)
        .typeText('#newURL', goLink)
        .click('#btnSave')

        // Use the assertion to check if the actual header text is equal to the expected one
        .expect(Selector('#statusArea').innerText).eql('GoLink Added')
        .click('#delete-' + goLink)
        .click('.modal-footer>.btn-primary')
        .expect(Selector('#statusArea').innerText).eql('GoLink Deleted')
        ;
});