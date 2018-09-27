describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe('home', () => {
    it('should have home screen', async () => {
      await expect(element(by.id('home'))).toBeVisible();
    });

    it('should have bar', async () => {
      await expect(element(by.id('home_bar'))).toBeVisible();
    });

    it('should have scan headline', async () => {
      await expect(element(by.id('home_scan_head'))).toBeVisible();
      await expect(element(by.id('home_scan_head'))).toHaveText('Scan & Send');
    });

    it('should have account component', async () => {
      await expect(element(by.id('account'))).toBeVisible();
    });

    it('should have scan button', async () => {
      await expect(element(by.id('home_scan'))).toBeVisible();
    });

    it('should have accessibility labels', async () => {
      await expect(element(by.label('Tap to scan and send Ether'))).toBeVisible();
    });
  
    it('should show scan screen after tap', async () => {
      await element(by.id('home_scan')).tap();
      await expect(element(by.id('camera'))).toBeVisible();
    });
  });
})
