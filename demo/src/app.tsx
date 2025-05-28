import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import cn from 'classnames';
import { Button } from './components/ui/button';
import { useScript } from './hooks/use-script';
import { FieldWrapper } from './components/field-wrapper';
import { Color, Locale, LogoAlignment, Size, type ButtonConfig } from './types/button-config';
import { getButtonPreview } from './lib/utils';
import copy from 'copy-to-clipboard';
import { toast } from 'sonner';

export default function ButtonConfigPage() {
  const [buttonConfig, setButtonConfig] = useState<ButtonConfig>({
    size: Size.Large,
    color: Color.Brand,
    logoAlignment: LogoAlignment.Left,
    caption: '',
    appId: '',
    locale: Locale.Uk,
    fullWidth: false,
    className: '',
    devMode: false,
  });

  const [errors, setErrors] = useState({
    appId: true,
  });

  const isInitialized = useScript(`${import.meta.env.VITE_APP_SCRIPT_URL}kpi-id-signin.js`);

  const buttonPreview = getButtonPreview(buttonConfig);

  useEffect(() => {
    if (window.KPIID && isInitialized) {
      window.KPIID.init();
    }
  }, [buttonConfig, isInitialized]);

  const handleChange = (field: string, value: string | boolean) => {
    setButtonConfig((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === 'appId') {
      setErrors((prev) => ({
        ...prev,
        appId: value === '',
      }));
    }
  };

  const handleCopyScript = () => {
    copy(buttonPreview);
    toast.success('Script copied to clipboard');
  };

  return (
    <div className="mx-auto px-10 py-10">
      <div className="grid grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Button Configuration</CardTitle>
            <CardDescription>Customize your button appearance and behavior</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="appId">App ID (required)</Label>
                  <Input
                    id="appId"
                    value={buttonConfig.appId}
                    onChange={(e) => handleChange('appId', e.target.value)}
                    placeholder="Enter app ID"
                    className={errors.appId ? 'border-red-500' : ''}
                  />
                  {errors.appId && <p className="mt-1 text-sm text-red-500">App ID is required</p>}
                </div>

                <FieldWrapper label="Size">
                  <Select value={buttonConfig.size} onValueChange={(value) => handleChange('size', value)}>
                    <SelectTrigger id="size">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldWrapper>

                <FieldWrapper label="Color">
                  <Select value={buttonConfig.color} onValueChange={(value) => handleChange('color', value)}>
                    <SelectTrigger id="color">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brand">Brand</SelectItem>
                      <SelectItem value="outline">Outline</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldWrapper>

                <FieldWrapper label="Logo Alignment">
                  <RadioGroup
                    value={buttonConfig.logoAlignment}
                    onValueChange={(value) => handleChange('logoAlignment', value)}
                    className="mt-2 flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="left" id="logo-left" />
                      <Label htmlFor="logo-left">Left</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="right" id="logo-right" />
                      <Label htmlFor="logo-right">Right</Label>
                    </div>
                  </RadioGroup>
                </FieldWrapper>

                <FieldWrapper label="Caption (optional)">
                  <Input
                    id="caption"
                    value={buttonConfig.caption}
                    onChange={(e) => handleChange('caption', e.target.value)}
                    placeholder="Enter button caption"
                  />
                </FieldWrapper>

                <FieldWrapper label="Locale">
                  <RadioGroup
                    value={buttonConfig.locale}
                    onValueChange={(value) => handleChange('locale', value)}
                    className="mt-2 flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="en" id="locale-en" />
                      <Label htmlFor="locale-en">EN</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="uk" id="locale-uk" />
                      <Label htmlFor="locale-uk">UK</Label>
                    </div>
                  </RadioGroup>
                </FieldWrapper>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fullWidth"
                    checked={buttonConfig.fullWidth}
                    onCheckedChange={(checked) => handleChange('fullWidth', !!checked)}
                  />
                  <Label htmlFor="fullWidth">Full Width</Label>
                </div>

                <FieldWrapper label="Class Name (optional)">
                  <Input
                    id="className"
                    value={buttonConfig.className}
                    onChange={(e) => handleChange('className', e.target.value)}
                    placeholder="Enter custom class name"
                  />
                </FieldWrapper>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="devMode"
                    checked={buttonConfig.devMode}
                    onCheckedChange={(checked) => handleChange('devMode', !!checked)}
                  />
                  <Label htmlFor="devMode">Dev Mode</Label>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Button Preview</CardTitle>
            <CardDescription>Live preview of your configured button</CardDescription>
          </CardHeader>
          <CardContent className="flex grow items-center justify-center">
            <div
              className={cn('flex w-full justify-center', {
                'rounded border border-dashed border-red-500 p-4': buttonConfig.devMode,
              })}
              dangerouslySetInnerHTML={{ __html: buttonPreview }}
            ></div>
          </CardContent>
          <CardFooter className="text-muted-foreground text-sm">
            <div className="flex w-full flex-col">
              <p>
                <strong>Code:</strong>
              </p>
              <pre className="my-2 w-full text-wrap rounded-sm border-2 border-neutral-200 p-2 font-mono">
                {buttonPreview}
              </pre>
              <Button disabled={!!errors.appId} onClick={handleCopyScript}>
                Copy to clipboard
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
