import TabsLayout from "./TabsLayout";

export default function LemonTab() {
  return (<>
    <TabsLayout>
      <div className="d-flex">
        <div className="px-4 pb-2 pt-3">
          <h4>Brand New Lemon</h4>
          <h5>Characters:</h5>
          <div>
            <strong className='text-uppercase'>Teeth</strong>:&nbsp;
            Ghost
          </div>
          <div>
            <strong className='text-uppercase'>Eyes</strong>:&nbsp;
            Ghost
          </div>
          <div>
            <strong className='text-uppercase'>Head</strong>:&nbsp;
            Ghost
          </div>
        </div>
      </div>
    </TabsLayout>
  </>)
}