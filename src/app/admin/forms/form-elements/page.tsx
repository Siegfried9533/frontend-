import type { Metadata } from "next";

import { GlobeIcon } from "@/app/admin/assets/icons";
import Breadcrumb from "@/app/admin/components/common/Breadcrumbs/Breadcrumb";
import DatePickerOne from "@/app/admin/components/common/FormElements/DatePicker/DatePickerOne";
import DatePickerTwo from "@/app/admin/components/common/FormElements/DatePicker/DatePickerTwo";
import InputGroup from "@/app/admin/components/common/FormElements/InputGroup";
import { TextAreaGroup } from "@/app/admin/components/common/FormElements/InputGroup/text-area";
import MultiSelect from "@/app/admin/components/common/FormElements/MultiSelect";
import { Checkbox } from "@/app/admin/components/common/FormElements/checkbox";
import { RadioInput } from "@/app/admin/components/common/FormElements/radio";
import { Select } from "@/app/admin/components/common/FormElements/select";
import { Switch } from "@/app/admin/components/common/FormElements/switch";
import { ShowcaseSection } from "@/app/admin/components/common/Layouts/showcase-section";

export const metadata: Metadata = {
  title: "Form Elements",
};

export default function FormElementsPage() {
  return (
    <>
      <Breadcrumb pageName="Form Elements" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <ShowcaseSection title="Input Fields" className="space-y-5.5 !p-6.5">
            <InputGroup
              label="Default input"
              placeholder="Default input text"
              type="text"
            />

            <InputGroup
              label="Active input"
              placeholder="Active input text"
              active
              type="text"
            />

            <InputGroup
              label="Disabled input"
              placeholder="Disabled input text"
              type="text"
              disabled
            />
          </ShowcaseSection>

          <ShowcaseSection
            title="Toggle switch input"
            className="space-y-5.5 !p-6.5"
          >
            <Switch />
            <Switch backgroundSize="sm" />
            <Switch withIcon />
            <Switch background="dark" />
          </ShowcaseSection>

          <ShowcaseSection title="Time and date" className="space-y-5.5 !p-6.5">
            <DatePickerOne />
            <DatePickerTwo />
          </ShowcaseSection>

          <ShowcaseSection title="File upload" className="space-y-5.5 !p-6.5">
            <InputGroup
              type="file"
              fileStyleVariant="style1"
              label="Attach file"
              placeholder="Attach file"
            />

            <InputGroup
              type="file"
              fileStyleVariant="style2"
              label="Attach file"
              placeholder="Attach file"
            />
          </ShowcaseSection>
        </div>

        <div className="flex flex-col gap-9">
          <ShowcaseSection title="Textarea Fields" className="space-y-6 !p-6.5">
            <TextAreaGroup
              label="Default textarea"
              placeholder="Default textarea"
            />

            <TextAreaGroup
              label="Active textarea"
              placeholder="Active textarea"
              active
            />

            <TextAreaGroup
              label="Disabled textarea"
              placeholder="Disabled textarea"
              disabled
            />
          </ShowcaseSection>

          <ShowcaseSection title="Select input" className="space-y-5.5 !p-6.5">
            <Select
              label="Select Country"
              items={[
                { label: "United States", value: "USA" },
                { label: "United Kingdom", value: "UK" },
                { label: "Canada", value: "Canada" },
              ]}
              defaultValue="USA"
              prefixIcon={<GlobeIcon />}
            />
            <MultiSelect id="multiSelect" />
          </ShowcaseSection>

          <ShowcaseSection
            title="Checkbox and radio"
            className="space-y-5.5 !p-6.5"
          >
            <Checkbox label="Checkbox Text" />
            <Checkbox label="Checkbox Text" withIcon="check" />
            <Checkbox label="Checkbox Text" withIcon="x" />
            <RadioInput label="Checkbox Text" />
            <RadioInput label="Checkbox Text" variant="circle" />
          </ShowcaseSection>
        </div>
      </div>
    </>
  );
}
