import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, Shield, Palette, Database, Key } from "lucide-react";

const Settings = () => {
  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-4xl font-bold mb-2 gradient-primary bg-clip-text text-transparent">
          个人设置
        </h1>
        <p className="text-muted-foreground">管理您的账户设置和偏好</p>
      </div>

      <Tabs defaultValue="profile" className="animate-scale-in">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            个人资料
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            通知
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            安全
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="h-4 w-4 mr-2" />
            外观
          </TabsTrigger>
          <TabsTrigger value="api">
            <Key className="h-4 w-4 mr-2" />
            API
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>个人资料</CardTitle>
              <CardDescription>更新您的个人信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>用户</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">上传头像</Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    推荐使用 JPG, PNG 格式，大小不超过 2MB
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">用户名</Label>
                  <Input id="name" placeholder="请输入用户名" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bio">个人简介</Label>
                  <Input id="bio" placeholder="简单介绍一下自己" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="occupation">职业</Label>
                  <Input id="occupation" placeholder="编剧 / 导演 / 制片人" />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">取消</Button>
                <Button className="gradient-primary">保存更改</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>通知设置</CardTitle>
              <CardDescription>管理您接收的通知类型</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">邮件通知</div>
                  <div className="text-sm text-muted-foreground">
                    接收项目更新和系统通知
                  </div>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">AI创作完成通知</div>
                  <div className="text-sm text-muted-foreground">
                    当AI完成创作任务时通知您
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">系统更新</div>
                  <div className="text-sm text-muted-foreground">
                    接收新功能和更新通知
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">营销邮件</div>
                  <div className="text-sm text-muted-foreground">
                    接收产品更新和优惠信息
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>安全设置</CardTitle>
              <CardDescription>保护您的账户安全</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="current-password">当前密码</Label>
                  <Input id="current-password" type="password" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="new-password">新密码</Label>
                  <Input id="new-password" type="password" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">确认新密码</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">取消</Button>
                <Button className="gradient-primary">更新密码</Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">双因素认证</div>
                  <div className="text-sm text-muted-foreground">
                    增强账户安全性
                  </div>
                </div>
                <Button variant="outline">启用</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>外观设置</CardTitle>
              <CardDescription>自定义界面外观</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">深色模式</div>
                  <div className="text-sm text-muted-foreground">
                    切换深色/浅色主题
                  </div>
                </div>
                <Switch />
              </div>

              <Separator />

              <div>
                <Label className="mb-4 block">主题颜色</Label>
                <div className="grid grid-cols-6 gap-3">
                  {["hsl(0 86% 60%)", "hsl(220 86% 60%)", "hsl(140 86% 50%)", "hsl(280 86% 60%)", "hsl(40 86% 60%)", "hsl(320 86% 60%)"].map((color, idx) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-lg cursor-pointer hover-lift border-2 border-transparent hover:border-primary transition-all"
                      style={{ background: color }}
                    />
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">动画效果</div>
                  <div className="text-sm text-muted-foreground">
                    启用界面动画和过渡效果
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>API设置</CardTitle>
              <CardDescription>管理您的API密钥和集成</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="api-key">API密钥</Label>
                  <div className="flex gap-2">
                    <Input id="api-key" value="••••••••••••••••" readOnly />
                    <Button variant="outline">显示</Button>
                    <Button variant="outline">复制</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    请妥善保管您的API密钥，不要与他人分享
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-medium">API使用统计</div>
                    <div className="text-sm text-muted-foreground">
                      本月API调用次数
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">1,234</div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "45%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  已使用 45% / 配额 10,000 次调用
                </p>
              </div>

              <Separator />

              <div className="flex justify-end gap-2">
                <Button variant="outline">重置密钥</Button>
                <Button className="gradient-primary">生成新密钥</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
